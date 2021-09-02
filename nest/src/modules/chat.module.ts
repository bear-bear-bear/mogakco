import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RoomRepository from '../models/repositories/room.repository';
import ChatController from '../controllers/chat.controller';
import ChatGateway from '../controllers/chat.gateway';
import ChatService from '../services/chat.service';
import AuthModule from './auth.module';
import UserModule from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository]), AuthModule, UserModule],
  // imports: [TypeOrmModule.forFeature([RoomRepository])],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
class ChatModule {}

export default ChatModule;
