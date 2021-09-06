import { Injectable } from '@nestjs/common';
import RoomRepository from './repositories/room.repository';

@Injectable()
class ChatService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async isAvailable(id: number) {
    const room = await this.roomRepository.findOne(id);
    return room !== undefined;
  }
}

export default ChatService;
