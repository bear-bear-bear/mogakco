import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModule from '@models/user/user.module';
import AuthModule from '@authentication//auth.module';
import RoomRepository from './repositories/room.repository';
import ChatController from './chat.controller';
import ChatGateway from './chat.gateway';
import ChatService from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository]), AuthModule, UserModule],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
class ChatModule {}

export default ChatModule;
