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
import RoomRepository from '@models/chat/repositories/room.repository';

interface IJoinChatRoom {
  userId: number;
  roomId: string;
}

@WebSocketGateway({
  namespace: 'chat',
  cors: { origin: '*', credentials: true },
})
class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private logger = new Logger('Chat');

  constructor(
    private readonly chatService: ChatService,
    private readonly userRepository: UserRepository,
    private readonly roomRepository: RoomRepository,
  ) {}

  handleConnection(client: Socket) {
    const username = client.handshake.headers['user-name'];
    if (username === 'no-user') throw new InternalServerErrorException();
    client.broadcast.emit('enterRoom', `${username} 이 입장하였습니다.`);
    this.logger.debug(`client ${client.conn.id} connection!`);
  }

  // TODO: 단순화 가능성 보임
  async handleDisconnect(client: Socket) {
    const userId = client.handshake.headers['user-id'] as string;
    const roomId = client.handshake.headers['room-id'] as string;
    if (!(userId && roomId)) throw new InternalServerErrorException();
    const user = await this.userRepository.findOne({ id: Number(userId) });
    if (!user) throw new InternalServerErrorException();
    const room = await this.roomRepository.findOne({ id: Number(roomId) });
    if (!room) throw new InternalServerErrorException();
    await this.chatService.exitRoom(user, room);
    client.broadcast.emit('exitUser', `${user.username} 유저가 퇴장하였습니다.`);
    this.logger.log(`${user.username} 유저가 ${room.id} 방에서 퇴장하였습니다.`);
    this.logger.debug(`client ${client.conn.id} disconnected`);
  }

  @SubscribeMessage('joinChatRoom')
  async joinChatRoom(client: Socket, { roomId, userId }: IJoinChatRoom) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) throw new UnauthorizedException();
    await this.chatService.joinRoom(user, Number(roomId));
    this.server.to(roomId).emit('joinUserMessage', client.conn.id);
    return {
      joinedUserName: user.username,
      joinedRoomId: roomId,
    };
  }

  // TODO: 개발 중
  @SubscribeMessage('chat')
  async chat(client: Socket, message: string) {
    const username = client.handshake.headers['user-name'] as string;
    client.broadcast.emit('chat', {
      username,
      message,
      type: 'chat',
    });
  }
}

export default ChatGateway;
