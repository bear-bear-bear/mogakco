import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      template: {
        dir: join(__dirname, '../services/email'),
        adapter: new PugAdapter(),
      },
    }),
  ],
  providers: [],
  exports: [MailModule],
})
export default class MailModule {}
