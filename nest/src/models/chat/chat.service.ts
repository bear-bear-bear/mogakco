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
import { Chat, IChatService, LeaveRoom, UserAndRoom } from '@models/chat/interface/service';
import ChatRepository from '@models/chat/repositories/chat.repository';
import AnonymousRoomUserRepository from '@models/chat/repositories/anonymous-room-user.repository';

@Injectable()
class ChatService implements IChatService {
  private readonly logger = new Logger('ChatService');

  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
    private readonly userRepository: UserRepository,
    private readonly chatRepository: ChatRepository,
    private readonly anonymousRoomUserRepository: AnonymousRoomUserRepository,
  ) {}

  /**
   * @desc 익명 이름을 생성하여 반환합니다.
   */
  async findOrCreateAnonymousName(headers: IncomingHttpHeaders) {
    try {
      const [userId, roomId] = this.getIdsFromHeader(headers);
      const anonymousName = await this.anonymousRoomUserRepository.findOrCreate(userId, roomId);
      return anonymousName;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
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
  async makeAndSaveChat(headers: IncomingHttpHeaders, message: string): Promise<Chat[]> {
    const [userId, roomId] = this.getIdsFromHeader(headers);
    const { user, room } = await this.findUserAndRoom(userId, roomId);
    if (!(user && room)) throw new InternalServerErrorException();
    const { username } = await this.findOrCreateAnonymousName(headers);
    const { id: chatId } = await this.chatRepository.createChat(user, room, message);
    const globalChat = this.createChatResponse(chatId, username, message, false);
    const myChat = this.createChatResponse(chatId, username, message, true);
    return [globalChat, myChat];
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
    console.log({ headers });
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
  createChatResponse(chatId: number, username: string, message: string, isOwner: boolean): Chat {
    return {
      id: chatId,
      username,
      message,
      type: isOwner ? 'my-chat' : 'chat',
    };
  }
}

export default ChatService;
