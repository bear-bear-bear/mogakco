import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import RoomRepository from './repositories/room.repository';
import UserRepository from '@models/user/repositories/user.repository';
import UserEntity from '@models/user/entities/user.entity';
import RoomUserRepository from '@models/chat/repositories/room-user.repository';
import RoomEntity from '@models/chat/entities/room.entity';

@Injectable()
class ChatService {
  private readonly logger = new Logger('ChatService');

  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * @desc 해당 번호에 해당하는 채팅방이 이용가능한 지 여부를 반환합니다.
   */
  async isAvailable(id: number): Promise<boolean> {
    const room = await this.roomRepository.findOne(id);
    return room !== undefined;
  }

  /**
   * @desc 채팅방에 존재하는 모든 유저 수를 찾습니다.
   */
  async getRoomMembers(id: number) {
    const [, count] = await this.roomUserRepository.findAndCount({
      where: { roomId: id },
    });
    return count;
  }

  /**
   * @desc 해당 유저가 채팅방(Room)에 입장합니다.
   */
  async joinRoom(user: UserEntity, roomId: number) {
    const room = await this.roomRepository.findOne({ id: roomId });
    if (!room) throw new BadRequestException();

    const enter = this.roomUserRepository.create({
      roomId: room,
      userId: user,
    });
    await enter.save();
    this.logger.log(`${user.username} 유저가 ${roomId} 번 방에 참여되었습니다.`);
  }

  /**
   * @desc 해당 유저가 속한 채팅방 번호를 찾습니다.
   */
  async findBelongToRoomByUserId(user: UserEntity) {
    if (!user) throw new InternalServerErrorException();
    const roomUser = await this.roomUserRepository.findOne({
      where: { userId: user?.id },
      relations: ['roomId'],
    });
    if (!roomUser) throw new InternalServerErrorException();
    return roomUser.roomId;
  }

  /**
   * @desc 해당 유저를 해당 룸에서 퇴장 처리합니다.
   */
  async exitRoom(user: UserEntity, room: RoomEntity) {
    await this.roomUserRepository.delete({
      roomId: room,
      userId: user,
    });
  }

  /**
   * @desc 채팅 응답 객체를 생성합니다.
   */
  createChatResponse(chatId: number, username: string, message: string, isOwner: boolean) {
    return {
      id: chatId,
      username,
      message,
      type: isOwner ? 'my-chat' : 'chat',
    };
  }
}

export default ChatService;
