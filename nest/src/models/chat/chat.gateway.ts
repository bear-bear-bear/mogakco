import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import ChatService from './chat.service';
import UserRepository from '@models/user/repositories/user.repository';
import { IChatGateway } from '@models/chat/interface/gateway';
import AnonymousRoomUserRepository from '@models/chat/repositories/anonymous-room-user.repository';
import RoomUserRepository from '@models/chat/repositories/room-user.repository';

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
    private readonly roomUserRepository: RoomUserRepository,
  ) {}

  async handleConnection(client: Socket) {
    const { auth } = client.handshake;
    const headerUserName = auth['user-name'];
    if (headerUserName === 'no-user' || !headerUserName) throw new InternalServerErrorException();
    const { username } = await this.chatService.findOrCreateAnonymousName(auth);
    this.server.emit('enter', {
      id: uuid(),
      type: 'enter',
      username,
    });

    this.logger.debug(`client ${client.conn.id} connection!`);
    this.logger.log(`${username} 유저가 ${auth['room-id']} 번 방에 참여되었습니다.`);
  }

  async handleDisconnect(client: Socket) {
    const { auth } = client.handshake;
    const { roomId } = await this.chatService.leaveRoom(auth);
    const { username } = await this.chatService.findOrCreateAnonymousName(auth);
    await this.anonymousRoomUserRepository.deleteName(username);
    client.broadcast.emit('exit', {
      id: uuid(),
      username,
      type: 'exit',
    });

    const memberCount = await this.roomUserRepository.count({
      where: { roomId },
    });
    this.server.emit('member-count', memberCount);

    this.logger.log(`${username} 유저가 ${roomId} 방에서 퇴장하였습니다.`);
    this.logger.debug(`client ${client.conn.id} disconnected`);
  }

  @SubscribeMessage('join-room')
  async join(client: Socket, { roomId, userId }: IJoinChatRoom) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) throw new UnauthorizedException();
    const { username } = await this.chatService.findOrCreateAnonymousName(client.handshake.auth);
    await this.chatService.joinRoom(user, Number(roomId));
    const memberCount = await this.roomUserRepository.count({
      where: { roomId: client.handshake.auth['room-id'] },
    });

    this.server.emit('member-count', memberCount);
    return {
      joinedUserName: username,
      joinedRoomId: Number(roomId),
    };
  }

  @SubscribeMessage('chat')
  async chat(client: Socket, message: string) {
    const { auth } = client.handshake;
    const [globalChat, myChat] = await this.chatService.makeAndSaveChat(auth, message);
    client.broadcast.emit('chat', globalChat);
    client.emit('chat', myChat);
  }
}
