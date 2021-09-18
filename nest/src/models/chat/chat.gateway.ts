import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UnauthorizedException } from '@nestjs/common';

import ChatService from './chat.service';
import UserRepository from '@models/user/repositories/user.repository';
import { IChatGateway } from '@models/chat/interface/gateway';
import AnonymousRoomUserRepository from '@models/chat/repositories/anonymous-room-user.repository';

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

  async handleConnection(@ConnectedSocket() client: Socket) {
    const { auth } = client.handshake;
    const [userId, roomId] = this.chatService.getIdsFromHeader(auth);
    const {
      anonymousUser: { username },
      isCreated,
    } = await this.chatService.findOrCreateAnonymousName(auth);
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) throw new UnauthorizedException();
    if (isCreated) {
      await this.chatService.joinRoom(user, Number(roomId));
      this.chatService.emitEnterOrExitEvent(this.server, username, 'enter');
    }
    await this.chatService.emitMemberCountEvent(this.server, client.handshake.auth);
    this.logger.debug(`client ${client.conn.id} connection!`);
    this.logger.log(`${username} 유저가 ${auth['room-id']} 번 방에 참여되었습니다.`);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const { auth } = client.handshake;
    const [userId, roomId] = this.chatService.getIdsFromHeader(auth);
    await this.chatService.leaveRoom(auth);
    const {
      anonymousUser: { username },
    } = await this.chatService.findOrCreateAnonymousName(auth);
    await this.anonymousRoomUserRepository.deleteName(username);
    this.chatService.emitEnterOrExitEvent(this.server, username, 'exit');
    this.logger.log(`${username} 유저가 ${roomId} 방에서 퇴장하였습니다.`);
    this.logger.debug(`client ${client.conn.id} disconnected`);
    await this.chatService.checkDeleteRoom(auth);
    await this.chatService.emitMemberCountEvent(this.server, auth);
    this.server.emit('check-multiple-user', userId);
  }

  @SubscribeMessage('chat')
  async chat(@ConnectedSocket() client: Socket, @MessageBody() message: string): Promise<void> {
    const { auth } = client.handshake;
    const chat = await this.chatService.makeAndSaveChat(auth, message);
    this.server.emit('chat', chat);
  }
}
