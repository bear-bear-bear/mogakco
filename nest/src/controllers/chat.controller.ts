import { BadRequestException, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import ChatService from '../services/chat.service';

@Controller('chat')
class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/available/:id')
  async isAvailableChatRoom(
    @Param('id', ParseIntPipe)
    roomId: number,
  ) {
    const available = await this.chatService.isAvailable(roomId);
    if (available) {
      return {
        message: '채팅방이 존재합니다',
        statusCode: 200,
      };
    }
    throw new BadRequestException('채팅방이 존재하지 않습니다.');
  }
}

export default ChatController;
