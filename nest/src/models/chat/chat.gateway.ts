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
import { ChatEvent } from '@common/helpers/enum.helper';

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

  /**
   * @desc 사용자를 입장처리 합니다.
   * @desc 방이 존재하지 않으면 사용자 희망분야 기반으로 생성하고 입장처리합니다.
   */
  async handleConnection(@ConnectedSocket() client: Socket) {
    const { auth } = client.handshake;
    const { userId, roomId } = this.chatService.getInfoFromHeader(auth);
    client.join(String(roomId));
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
    this.logger.log(`${username} 유저가 ${roomId} 번 방에 참여되었습니다.`);
  }

  /**
   * @desc 사용자를 퇴장처리 합니다.
   * @desc 해당 방에서 인원 수가 0명이면 방을 삭제합니다.
   */
  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const { auth } = client.handshake;
    const { userId, roomId } = this.chatService.getInfoFromHeader(auth);
    await this.chatService.leaveRoom(auth);
    client.leave(String(roomId));
    const {
      anonymousUser: { username },
    } = await this.chatService.findOrCreateAnonymousName(auth);
    await this.anonymousRoomUserRepository.deleteName(username);
    this.chatService.emitEnterOrExitEvent(this.server, username, 'exit');
    this.logger.log(`${username} 유저가 ${roomId} 방에서 퇴장하였습니다.`);
    this.logger.debug(`client ${client.conn.id} disconnected`);
    await this.chatService.checkDeleteRoom(auth);
    await this.chatService.emitMemberCountEvent(this.server, auth);
    this.server.to(String(roomId)).emit(ChatEvent.CHECK_MULTIPLE_USER, userId);
  }

  /**
   * @desc 사용자가 존재하는 방에 채팅 이벤트를 발생시킵니다.
   */
  @SubscribeMessage(ChatEvent.SEND_CHAT)
  async chat(@ConnectedSocket() client: Socket, @MessageBody() message: string): Promise<void> {
    const { auth } = client.handshake;
    const chat = await this.chatService.makeAndSaveChat(auth, message);
    this.server.emit(ChatEvent.SEND_CHAT, chat);
  }

  async fileUpload(client: Socket, file: Express.Multer.File): Promise<void> {
    console.log(client, file);
  }
}
