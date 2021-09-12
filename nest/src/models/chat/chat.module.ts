import { Module } from '@nestjs/common';
import UserModule from '@models/user/user.module';
import AuthModule from '@authentication/modules/auth.module';
import ChatController from './chat.controller';
import ChatGateway from './chat.gateway';
import ChatService from './chat.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export default class ChatModule {}
