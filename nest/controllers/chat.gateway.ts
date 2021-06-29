import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway({ namespace: 'chat' })
class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server!: Server;

  private logger = new Logger('Chat');

  async handleConnection(client: Socket) {
    this.logger.log('client connection!');
    this.logger.log(client);
    return client;
  }

  @SubscribeMessage('connection')
  async handleConnect(client: Socket) {
    this.logger.log('client connection!');
    this.logger.log(client);
    return client;
  }

  @SubscribeMessage('events')
  async handleEvent(@MessageBody() data: string) {
    this.logger.log(data);
    return data;
  }

  @SubscribeMessage('eventTest')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(data);
    return from([4, 5, 6]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number) {
    return data + 5;
  }
}

export default ChatGateway;
