import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: '',
      defaults: {
        from: '',
      },
      template: {
        dir: __dirname,
        adapter: new PugAdapter(),
      },
    }),
  ],
  providers: [],
  exports: [MailModule],
})
export default class MailModule {}
