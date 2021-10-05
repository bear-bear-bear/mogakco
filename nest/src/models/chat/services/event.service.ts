import { Injectable } from '@nestjs/common';
import { HandShakeAuth, IChatEventService } from '@models/chat/interface/service';
import { Server } from 'socket.io';
import { ChatEvent } from '@models/chat/interface/enum';
import { v1 as uuid } from 'uuid';
import ChatService from '@models/chat/services/chat.service';
import RoomUserRepository from '@models/chat/repositories/room-user.repository';

@Injectable()
export default class ChatEventService implements IChatEventService {
  constructor(
    private readonly chatService: ChatService,
    private readonly roomUserRepository: RoomUserRepository,
  ) {}

  /**
   * @desc 채팅방의 멤버수를 구해서 멤버수 카운트 이벤트를 emit 합니다.
   */
  async emitMemberCountEvent(server: Server, auth: HandShakeAuth): Promise<void> {
    const { roomId } = this.chatService.getInfoFromHeader(auth);
    const memberCount = await this.roomUserRepository.count({
      where: { roomId },
    });
    server.emit(ChatEvent.SEND_MEMBER_COUNT, memberCount);
  }

  /**
   * @desc 입장 또는 퇴장 이벤트를 emit 합니다.
   */
  emitEnterOrExitEvent(server: Server, username: string, type: 'enter' | 'exit'): void {
    server.emit(type, {
      id: uuid(),
      type,
      username,
    });
  }
}
