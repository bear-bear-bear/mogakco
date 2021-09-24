import { Module } from '@nestjs/common';
import ChatModule from '@models/chat/chat.module';
import ConfigModule from '@config/app/config.module';
import MariadbModule from '@config/database/mariadb.module';
import MailModule from '@mail/mail.module';
import AuthModule from '@authentication/modules/auth.module';
import AuthTestModule from '@authentication/modules/test.module';

@Module({
  imports: [ConfigModule, MariadbModule, AuthModule, MailModule, ChatModule, AuthTestModule],
  controllers: [],
  providers: [],
})
export default class AppModule {}
