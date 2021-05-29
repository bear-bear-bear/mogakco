import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

/**
 * @description MailerModule 에 어떠한 모듈을 설정해야 하는 지 기술함.
 * service: 이메일 공급자 서비스 이름
 * host: 이메일 호스트 도메인
 * port: 이메일 서비스 포트
 * auth->user: 이메일 계정
 * auth->pass: 이메일 비밀번호
 */
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async () => ({
        transport: {
          service: process.env.EMAIL_SERVICE_NAME as string,
          host: process.env.EMAIL_HOST as string,
          port: parseInt(process.env.EMAIL_SERVICE_PORT as string, 10),
          // secure: process.env.NODE_ENV === 'production', // TODO: 기존 정상 작동 코드
          secure: true,
          auth: {
            type: 'login',
            user: process.env.EMAIL_ADMIN as string,
            pass: process.env.EMAIL_PASSWORD as string,
          },
        },
        template: {
          dir: join(__dirname, '../services/email'),
          adapter: new PugAdapter(),
        },
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export default class MailModule {}
