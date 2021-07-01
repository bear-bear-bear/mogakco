import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import ChatService from '@services/chat.service';

@WebSocketGateway({ namespace: 'chat' })
class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private logger = new Logger('Chat');

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    this.logger.debug(`client ${client.id} connection!`);
  }

  handleDisconnect(client: Socket) {
    client.disconnect(true);
    this.logger.debug(`client ${client.id} disconnected`);
  }

  @SubscribeMessage('joinChatRoom')
  async joinChatRoom(client: Socket, roomId: string) {
    client.join(roomId);
    client.emit('joinSuccess');
  }
}

export default ChatGateway;
