import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RoomRepository from '@models/repositories/room.repository';
import ChatController from '@controllers/chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository])],
  controllers: [ChatController],
})
class ChatModule {}

export default ChatModule;
