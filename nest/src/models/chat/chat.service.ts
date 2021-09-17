import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import RoomRepository from './repositories/room.repository';
import UserEntity from '@models/user/entities/user.entity';
import RoomUserRepository from '@models/chat/repositories/room-user.repository';
import { IncomingHttpHeaders } from 'http';
import UserRepository from '@models/user/repositories/user.repository';
import {
  Chat,
  FindRoomAndJoin,
  HandShakeAuth,
  IChatService,
  LeaveRoom,
  UserAndRoom,
} from '@models/chat/interface/service';
import ChatRepository from '@models/chat/repositories/chat.repository';
import AnonymousRoomUserRepository from '@models/chat/repositories/anonymous-room-user.repository';
import { Server, Socket } from 'socket.io';
import { v1 as uuid } from 'uuid';
import RoomEntity from '@models/chat/entities/room.entity';

@Injectable()
export default class ChatService implements IChatService {
  private readonly logger = new Logger('ChatService');

  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
    private readonly userRepository: UserRepository,
    private readonly chatRepository: ChatRepository,
    private readonly anonymousRoomUserRepository: AnonymousRoomUserRepository,
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

  async checkDeleteRoom(headers: IncomingHttpHeaders): Promise<void> {
    const [, roomId] = this.getIdsFromHeader(headers);
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
      this.logger.log(`${room?.ownerId.username} 가 방장인 ${room?.id} 번 방을 제거하였습니다.`);
      await room?.softRemove();
    }
  }

  /**
   * @desc 익명 이름을 생성하여 반환합니다.
   */
  async findOrCreateAnonymousName(headers: IncomingHttpHeaders) {
    const [userId, roomId] = this.getIdsFromHeader(headers);
    const anonymousName = await this.anonymousRoomUserRepository.findOrCreate(userId, roomId);
    return anonymousName;
  }

  /**
   * @desc 해당 유저를 채팅방(Room) 에서 퇴장시킵니다.
   */
  async leaveRoom(headers: IncomingHttpHeaders): Promise<LeaveRoom> {
    const [userId, roomId] = this.getIdsFromHeader(headers);
    const { user, room } = await this.findUserAndRoom(userId, roomId);
    await this.roomUserRepository.leave(user, room);
    return { username: user.username, roomId: room.id };
  }

  /**
   * @desc 채팅을 만들고, DB 저장 후 반환합니다.
   */
  async makeAndSaveChat(headers: IncomingHttpHeaders, message: string): Promise<Chat> {
    const [userId, roomId] = this.getIdsFromHeader(headers);
    const { user, room } = await this.findUserAndRoom(userId, roomId);
    if (!(user && room)) throw new InternalServerErrorException();
    const {
      anonymousUser: { username },
    } = await this.findOrCreateAnonymousName(headers);
    const { id: chatId } = await this.chatRepository.createChat(user, room, message);
    return this.createChatResponse(chatId, user.id, username, message);
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
   * @desc headers 에서 id 를 추출하고 반환합니다.
   */
  getIdsFromHeader(headers: IncomingHttpHeaders): number[] {
    const userId = headers['user-id'];
    const roomId = headers['room-id'];
    if (!(userId && roomId)) throw new InternalServerErrorException();
    return [Number(userId), Number(roomId)];
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

  /**
   * @desc 채팅 응답 객체를 생성합니다.
   */
  createChatResponse(chatId: number, ownerId: number, username: string, message: string): Chat {
    return {
      id: chatId,
      ownerId,
      username,
      message,
      type: 'chat',
    };
  }

  /**
   * @desc 채팅방의 멤버수를 구해서 멤버수 카운트 이벤트를 emit 합니다.
   */
  async emitMemberCountEvent(server: Server, auth: HandShakeAuth): Promise<void> {
    const roomId = auth['room-id'];
    const memberCount = await this.roomUserRepository.count({
      where: { roomId },
    });
    server.emit('member-count', memberCount);
  }

  /**
   * @desc 입장 또는 퇴장 이벤트를 emit 합니다.
   */
  emitEnterOrExitEvent(server: Server, username: string, type: 'enter' | 'exit'): void {
    server.emit(type, {
      id: uuid(),
      type,
      username,
    });
  }
}
