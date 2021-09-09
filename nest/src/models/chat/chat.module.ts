import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModule from '@models/user/user.module';
import AuthModule from '@authentication/modules/auth.module';
import RoomRepository from './repositories/room.repository';
import ChatController from './chat.controller';
import ChatGateway from './chat.gateway';
import ChatService from './chat.service';
import UserRepository from '@models/user/repositories/user.repository';
import RoomUserRepository from '@models/chat/repositories/room-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomRepository, UserRepository, RoomUserRepository]),
    AuthModule,
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export default class ChatModule {}
