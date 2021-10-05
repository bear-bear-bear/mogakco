import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  FindRoomAndJoin,
  HandShakeAuth,
  IRoomService,
  LeaveRoom,
  UserAndRoom,
} from '@models/chat/interface/service';
import RoomRepository from '@models/chat/repositories/room.repository';
import RoomUserRepository from '@models/chat/repositories/room-user.repository';
import RoomEntity from '@models/chat/entities/room.entity';
import UserRepository from '@models/user/repositories/user.repository';
import ChatService from '@models/chat/services/chat.service';
import ChatAnonymousService from '@models/chat/services/anonymous.service';
import UserEntity from '@models/user/entities/user.entity';

@Injectable()
export default class RoomService implements IRoomService {
  constructor(
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
    private readonly anonymousService: ChatAnonymousService,
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * @desc 사용자의 추천 방을 찾아서 반환합니다.
   */
  async getRecommendRoom(id: number): Promise<RoomEntity | FindRoomAndJoin> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new BadRequestException('사용자가 존재하지 않습니다.');
    if (user.skills === null) {
      const randRoom = await this.roomRepository.getRandomRoom();
      if (randRoom) return randRoom;
      const createdRoom = await this.roomRepository.createEmptyRoom(user);
      return {
        room: createdRoom,
        isCreated: true,
      };
    }

    // FIX ME: strictRoom 동작 안함 확인
    const strictRoom = await this.roomRepository.getRoomStrictEqualSkills(user.skills);
    if (strictRoom) return strictRoom;

    const randSkillRoom = await this.roomRepository.findRoomByRandSkills(user.skills);
    if (randSkillRoom) return randSkillRoom;

    const createdRoom = await this.roomRepository.createRoom(user);
    return {
      room: createdRoom,
      isCreated: true,
    };
  }

  async checkDeleteRoom(auth: HandShakeAuth): Promise<void> {
    const { roomId } = this.chatService.getInfoFromHeader(auth);
    const room = await this.roomRepository.findOne(
      { id: roomId },
      {
        relations: ['ownerId'],
      },
    );
    const userCount = await this.roomUserRepository.count({
      where: {
        roomId,
      },
    });
    if (userCount === 0) {
      // this.logger.log(`${room?.ownerId.username} 가 방장인 ${room?.id} 번 방을 제거하였습니다.`);
      await room?.softRemove();
    }
  }

  /**
   * @desc 해당 유저를 채팅방(Room) 에서 퇴장시킵니다.
   */
  async leaveRoom(auth: HandShakeAuth): Promise<LeaveRoom> {
    const { userId, roomId } = this.chatService.getInfoFromHeader(auth);
    const { user, room } = await this.findUserAndRoom(userId, roomId);
    await this.roomUserRepository.leave(user, room);
    return { username: user.username, roomId: room.id };
  }

  /**
   * @desc 유저와 채팅방(Room)을 찾아서 반환합니다.
   */
  async findUserAndRoom(userId: number, roomId: number): Promise<UserAndRoom> {
    try {
      const user = await this.userRepository.findOne({ id: userId });
      const room = await this.roomRepository.findOne({ id: roomId });
      if (!(user && room)) throw new InternalServerErrorException();
      return { user, room };
    } catch (e) {
      throw new InternalServerErrorException('데이터베이스에서 오류가 발생하였습니다.');
    }
  }

  /**
   * @desc 해당 유저가 채팅방(Room)에 입장합니다.
   */
  async joinRoom(user: UserEntity, roomId: number): Promise<void> {
    const room = await this.roomRepository.findOne({ id: roomId });
    if (!room) throw new BadRequestException();

    const enter = this.roomUserRepository.create({
      roomId: room,
      userId: user,
    });
    await enter.save();
  }
}
