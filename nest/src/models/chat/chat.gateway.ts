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
import RoomRepository from './repositories/room.repository';
import ChatRepository from './repositories/chat.repository';
import RoomUserRepository from './repositories/room-user.repository';
import { IChatGateway } from '@models/chat/interface/gateway';

interface IJoinChatRoom {
  userId: number;
  roomId: string;
}

@WebSocketGateway({
  namespace: 'chat',
  cors: { origin: '*', credentials: true },
})
class ChatGateway implements IChatGateway, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private logger = new Logger('Chat');

  constructor(
    private readonly chatService: ChatService,
    private readonly userRepository: UserRepository,
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
    private readonly chatRepository: ChatRepository,
  ) {}

  handleConnection(client: Socket) {
    const username = client.handshake.headers['user-name'];
    if (username === 'no-user') throw new InternalServerErrorException();
    client.broadcast.emit('enterRoom', `${username} 이 입장하였습니다.`);
    this.logger.debug(`client ${client.conn.id} connection!`);
  }

  async handleDisconnect(client: Socket) {
    const { username, roomId } = await this.chatService.leaveRoom(client.handshake.headers);
    client.broadcast.emit('exitUser', `${username} 유저가 퇴장하였습니다.`);
    this.logger.log(`${username} 유저가 ${roomId} 방에서 퇴장하였습니다.`);
    this.logger.debug(`client ${client.conn.id} disconnected`);
  }

  @SubscribeMessage('joinChatRoom')
  async join(client: Socket, { roomId, userId }: IJoinChatRoom) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) throw new UnauthorizedException();
    await this.chatService.joinRoom(user, Number(roomId));
    this.server.to(roomId).emit('joinUserMessage', client.conn.id);
    return {
      joinedUserName: user.username,
      joinedRoomId: Number(roomId),
    };
  }

  @SubscribeMessage('chat')
  async chat(client: Socket, message: string) {
    const { headers } = client.handshake;
    const [globalChat, myChat] = await this.chatService.makeAndSaveChat(headers, message);
    client.broadcast.emit('chat', globalChat);
    client.emit('chat', myChat);
  }
}

export default ChatGateway;
