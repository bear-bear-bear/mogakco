import { Module } from '@nestjs/common';
import ChatModule from '@modules/chat.module';
import MailModule from '@modules/mail.module';
import ConfigModule from '@config/app/config.module';
import MariadbModule from '@config/database/mariadb.module';
import AuthModule from './authentication/auth.module';

@Module({
  imports: [ConfigModule, MariadbModule, AuthModule, MailModule, ChatModule],
  controllers: [],
  providers: [],
})
export default class AppModule {}
