import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import RoomRepository from '../repositories/room.repository';
import RoomUserRepository from '@models/chat/repositories/room-user.repository';
import UserRepository from '@models/user/repositories/user.repository';
import { Chat, HandShakeAuth, IChatService, InfoFromHeader } from '../interface/service';
import ChatRepository from '@models/chat/repositories/chat.repository';
import ChatAnonymousService from '@models/chat/services/anonymous.service';
import RoomService from '@models/chat/services/room.service';

@Injectable()
export default class ChatService implements IChatService {
  constructor(
    @Inject(forwardRef(() => RoomService))
    private readonly roomService: RoomService,
    @Inject(forwardRef(() => ChatAnonymousService))
    private readonly anonymousService: ChatAnonymousService,
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
    private readonly userRepository: UserRepository,
    private readonly chatRepository: ChatRepository,
  ) {}

  /**
   * @desc 채팅을 만들고, DB 저장 후 반환합니다.
   */
  async makeAndSaveChat(auth: HandShakeAuth, message: string): Promise<Chat> {
    const { userId, roomId } = this.getInfoFromHeader(auth);
    const { user, room } = await this.roomService.findUserAndRoom(userId, roomId);
    if (!(user && room)) throw new InternalServerErrorException();
    const {
      anonymousUser: { username },
    } = await this.anonymousService.findOrCreateAnonymousName(auth);
    const { id: chatId } = await this.chatRepository.createChat(user, room, message);
    return this.createChatResponse(chatId, user.id, username, message);
  }

  /**
   * @desc headers 에서 id 를 추출하고 반환합니다.
   */
  getInfoFromHeader({ userId, roomId }: HandShakeAuth): InfoFromHeader {
    if (!(userId && roomId)) throw new InternalServerErrorException();
    return {
      userId,
      roomId,
    };
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
}
