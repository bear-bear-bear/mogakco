import { Injectable, Logger } from '@nestjs/common';
import { IChatDevelopmentService } from '@models/chat/interface/service';
import { Socket } from 'socket.io';

@Injectable()
export default class ChatDevelopmentService implements IChatDevelopmentService {
  private readonly chatDevLog = new Logger('ChatDevService');

  logHandleConnection(client: Socket, username: string, roomId: number): void {
    this.chatDevLog.debug(`client ${client.conn.id} connection!`);
    this.chatDevLog.log(`${username} 유저가 ${roomId} 번 방에 참여되었습니다.`);
  }

  logHandleDisconnection(client: Socket, username: string, roomId: number): void {
    this.chatDevLog.log(`${username} 유저가 ${roomId} 방에서 퇴장하였습니다.`);
    this.chatDevLog.debug(`client ${client.conn.id} disconnected`);
  }
}
