import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import RoomRepository from '@models/repositories/room.repository';

@Controller('chat')
class ChatController {
  constructor(private roomRepository: RoomRepository) {}

  @Get('/available/:id')
  async isAvailableChatRoom(
    @Param('id', ParseIntPipe)
    roomId: number,
  ) {
    const isRoom = await this.roomRepository.findOne(roomId);
    if (isRoom !== undefined) {
      return {
        message: true,
        statusCode: 200,
      };
    }

    return {
      message: false,
      statusCode: 200,
    };
  }
}

export default ChatController;
