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
import ChatService from './services/chat.service';
import { IChatGateway } from '@models/chat/interface/gateway';
import { ChatEvent } from './interface/enum';
import ChatSimplifyService from '@models/chat/services/simple.service';
import ChatDevelopmentService from '@models/chat/services/dev.service';

@WebSocketGateway({
  namespace: 'chat',
  cors: { origin: '*', credentials: true },
})
export default class ChatGateway implements IChatGateway, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly simplifyService: ChatSimplifyService,
    private readonly chatService: ChatService,
    private readonly chatDevService: ChatDevelopmentService,
  ) {}

  /**
   * @desc 사용자를 입장처리 합니다.
   * @desc 방이 존재하지 않으면 사용자 희망분야 기반으로 생성하고 입장처리합니다.
   */
  async handleConnection(@ConnectedSocket() client: Socket) {
    const authInfo = this.chatService.getInfoFromHeader(client.handshake.auth);

    const isCreatedInfo = await this.simplifyService.connect(client, authInfo);
    await this.simplifyService.emitConnectionEvent(this.server, {
      info: authInfo,
      ...isCreatedInfo,
    });

    this.chatDevService.logHandleConnection(client, isCreatedInfo.username, authInfo.roomId);
  }

  /**
   * @desc 사용자를 퇴장처리 합니다.
   * @desc 해당 방에서 인원 수가 0명이면 방을 삭제합니다.
   */
  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const authInfo = this.chatService.getInfoFromHeader(client.handshake.auth);

    const anonymousName = await this.simplifyService.leave(client, authInfo);
    await this.simplifyService.emitLeaveEvent(this.server, authInfo, anonymousName);

    this.chatDevService.logHandleDisconnection(client, anonymousName, authInfo.roomId);
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
