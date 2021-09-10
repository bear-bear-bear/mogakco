import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModule from '@models/user/user.module';
import AuthModule from '@authentication//auth.module';
import RoomRepository from './repositories/room.repository';
import ChatController from './chat.controller';
import ChatGateway from './chat.gateway';
import ChatService from './chat.service';
import RoomUserRepository from '@models/chat/repositories/room-user.repository';
import UserRepository from '@models/user/repositories/user.repository';
import ChatRepository from '@models/user/repositories/chat.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomRepository, RoomUserRepository, UserRepository, ChatRepository]),
    AuthModule,
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
class ChatModule {}

export default ChatModule;
