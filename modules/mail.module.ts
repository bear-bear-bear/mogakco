import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          type: 'login',
          user: process.env.EMAIL_ADMIN as string,
          pass: process.env.EMAIL_PASSWORD as string,
        },
      },
      template: {
        dir: join(__dirname, '../services/email/'),
        adapter: new PugAdapter(),
      },
    }),
  ],
  providers: [],
  exports: [],
})
export default class MailModule {}
