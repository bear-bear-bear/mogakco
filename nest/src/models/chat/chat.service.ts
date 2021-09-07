import { Injectable } from '@nestjs/common';
import RoomRepository from './repositories/room.repository';

@Injectable()
class ChatService {
  constructor(private readonly roomRepository: RoomRepository) {}

  /**
   * @desc 해당 번호에 해당하는 채팅방이 이용가능한 지 여부를 반환합니다.
   */
  async isAvailable(id: number): Promise<boolean> {
    const room = await this.roomRepository.findOne(id);
    return room !== undefined;
  }
}

export default ChatService;
