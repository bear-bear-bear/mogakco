import { Module } from '@nestjs/common';
import UserModule from '@models/user/user.module';
import AuthModule from '@authentication/modules/auth.module';
import ChatController from './chat.controller';
import ChatGateway from './chat.gateway';
import ChatService from './services/chat.service';
import ChatAnonymousService from './services/anonymous.service';
import ChatSimplifyService from '@models/chat/services/simple.service';
import ChatDevelopmentService from '@models/chat/services/dev.service';
import ChatEventService from '@models/chat/services/event.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatGateway,
    ChatAnonymousService,
    ChatSimplifyService,
    ChatEventService,
    ChatDevelopmentService,
  ],
})
export default class ChatModule {}
