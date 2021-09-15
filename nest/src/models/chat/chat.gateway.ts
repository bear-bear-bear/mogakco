import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';

import ChatService from './chat.service';
import UserRepository from '@models/user/repositories/user.repository';
import { IChatGateway } from '@models/chat/interface/gateway';
import AnonymousRoomUserRepository from '@models/chat/repositories/anonymous-room-user.repository';

interface IJoinChatRoom {
  userId: number;
  roomId: string;
}

@WebSocketGateway({
  namespace: 'chat',
  cors: { origin: '*', credentials: true },
})
export default class ChatGateway implements IChatGateway, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private logger = new Logger('Chat');

  constructor(
    private readonly chatService: ChatService,
    private readonly userRepository: UserRepository,
    private readonly anonymousRoomUserRepository: AnonymousRoomUserRepository,
  ) {}

  async handleConnection(client: Socket) {
    const { auth } = client.handshake;
    const headerUserName = auth['user-name'];
    if (headerUserName === 'no-user' || !headerUserName) throw new InternalServerErrorException();
    const { username } = await this.chatService.findOrCreateAnonymousName(auth);
    this.chatService.emitEnterOrExitEvent(this.server, username, 'enter');

    this.logger.debug(`client ${client.conn.id} connection!`);
    this.logger.log(`${username} 유저가 ${auth['room-id']} 번 방에 참여되었습니다.`);
  }

  async handleDisconnect(client: Socket) {
    const { auth } = client.handshake;
    const { roomId } = await this.chatService.leaveRoom(auth);
    const { username } = await this.chatService.findOrCreateAnonymousName(auth);
    await this.anonymousRoomUserRepository.deleteName(username);
    this.chatService.emitEnterOrExitEvent(this.server, username, 'exit');
    await this.chatService.emitMemberCountEvent(this.server, auth);

    this.logger.log(`${username} 유저가 ${roomId} 방에서 퇴장하였습니다.`);
    this.logger.debug(`client ${client.conn.id} disconnected`);
  }

  @SubscribeMessage('join-room')
  async join(client: Socket, { roomId, userId }: IJoinChatRoom): Promise<void> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) throw new UnauthorizedException();
    await this.chatService.joinRoom(user, Number(roomId));
    await this.chatService.emitMemberCountEvent(this.server, client.handshake.auth);
  }

  @SubscribeMessage('chat')
  async chat(client: Socket, message: string): Promise<void> {
    const { auth } = client.handshake;
    const [globalChat, myChat] = await this.chatService.makeAndSaveChat(auth, message);
    this.chatService.emitChatEvent(client, globalChat, myChat);
  }
}
