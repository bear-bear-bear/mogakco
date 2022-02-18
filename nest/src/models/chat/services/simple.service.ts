import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IChatSimpleService,
  InfoFromHeader,
  SimpleConnectEvent,
  SimplifySocketConnect,
} from '@models/chat/interface/service';
import { Server, Socket } from 'socket.io';
import ChatService from '@models/chat/services/chat.service';
import { ChatEvent } from '@models/chat/interface/enum';
import AnonymousRoomUserRepository from '@models/chat/repositories/anonymous-room-user.repository';
import UserRepository from '@models/user/repositories/user.repository';
import ChatEventService from '@models/chat/services/event.service';
import ChatAnonymousService from '@models/chat/services/anonymous.service';
import RoomService from '@models/chat/services/room.service';

@Injectable()
export default class ChatSimplifyService implements IChatSimpleService {
  constructor(
    private readonly chatService: ChatService,
    private readonly roomService: RoomService,
    private readonly anonymousService: ChatAnonymousService,
    private readonly chatEventService: ChatEventService,
    private readonly anonymousRoomUserRepository: AnonymousRoomUserRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * @desc 소켓 서버에서 유저 퇴장 시 발생하는 이벤트 로직 메서드
   */
  async emitLeaveEvent(
    server: Server,
    info: InfoFromHeader,
    anonymousUserName: string,
  ): Promise<void> {
    this.chatEventService.emitEnterOrExitEvent(server, anonymousUserName, 'exit');
    await this.chatEventService.emitMemberCountEvent(server, info);
    server.to(String(info.roomId)).emit(ChatEvent.CHECK_MULTIPLE_USER, info.userId);
  }

  /**
   * @desc 서버 소켓과 데이터베이스에서 유저를 퇴장처리하는 로직이 간소화 된 메서드
   */
  async leave(client: Socket, info: InfoFromHeader): Promise<string> {
    await this.roomService.leaveRoom(info);
    client.leave(String(info.roomId));

    const {
      anonymousUser: { username },
    } = await this.anonymousService.findOrCreateAnonymousName(info);
    await this.anonymousRoomUserRepository.deleteName(username);
    await this.roomService.checkDeleteRoom(info);
    return username;
  }

  /**
   * @desc 소켓 서버에서 유저 입장 시 발생하는 이벤트 로직 메서드
   */
  async emitConnectionEvent(
    server: Server,
    { info: authInfo, username, isCreated }: SimpleConnectEvent,
  ): Promise<void> {
    if (isCreated) this.chatEventService.emitEnterOrExitEvent(server, username, 'enter');
    await this.chatEventService.emitMemberCountEvent(server, authInfo);
  }

  /**
   * @desc 서버 소켓과 데이터베이스에서 유저를 입장처리하는 로직이 간소화 된 메서드
   */
  async connect(client: Socket, info: InfoFromHeader): Promise<SimplifySocketConnect> {
    const { userId, roomId } = info;
    client.join(String(roomId));
    const {
      anonymousUser: { username },
      isCreated,
    } = await this.anonymousService.findOrCreateAnonymousName(info);
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) throw new UnauthorizedException();
    if (isCreated) await this.roomService.joinRoom(user, roomId);

    return {
      isCreated,
      username,
    };
  }
}
