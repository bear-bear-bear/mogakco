import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import ChatService from '../services/chat.service';

/**
 * @ClientIdentifier client 의 conn.id
 */
@WebSocketGateway({ namespace: 'chat' })
class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private logger = new Logger('Chat');

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    this.logger.debug(`client ${client.conn.id} connection!`);
  }

  handleDisconnect(client: Socket) {
    client.disconnect();
    this.logger.debug(`client ${client.conn.id} disconnected`);
  }

  @SubscribeMessage('joinChatRoom')
  async joinChatRoom(client: Socket, roomId: string) {
    this.server.to(roomId).emit('joinUserMessage', client.conn.id);
    return client.join(roomId);
  }

  @SubscribeMessage('chat')
  async chat(client: Socket, roomId: string) {
    console.log(client, roomId);
  }
}

export default ChatGateway;
