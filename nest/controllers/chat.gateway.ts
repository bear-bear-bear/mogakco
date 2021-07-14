import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import ChatService from '@services/chat.service';
import UserService from '@services/user.service';
import AuthService from '@services/auth.service';
import { IJoinChatRoomProps } from '../../types/chat';

/**
 * @ClientIdentifier client 의 conn.id
 */
@WebSocketGateway({ namespace: 'chat', cookie: false })
class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private logger = new Logger('Chat');

  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.debug(client.handshake.headers);
    this.logger.debug(`client ${client.conn.id} connectiondd!`);
  }

  handleDisconnect(client: Socket) {
    client.disconnect();
    client.emit('confirm-user');
    this.logger.debug(`client ${client.conn.id} disconnected`);
  }

  @SubscribeMessage('join-chat-room')
  async joinChatRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, userId }: IJoinChatRoomProps,
  ) {
    console.log({ roomId, userId });
    const { username } = await this.userService.findUserOne(userId);
    client.join(roomId);
    this.server.to(roomId).emit('join-user-msg', username);
  }

  @SubscribeMessage('events')
  connect(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    console.log(client.handshake.headers);
    return data;
  }

  @SubscribeMessage('chat')
  async chat(client: Socket, roomId: string) {
    console.log(client, roomId);
  }
}

export default ChatGateway;
