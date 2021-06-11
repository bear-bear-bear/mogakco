import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { emailFailure, emailSuccess } from '@lib/log';
import { UserVerifyEmailDto } from '@typing/auth';

// interface UserVerifyEmailDTO {
//   email: string;
//   token: string;
//   id: number;
// }

@Injectable()
export default class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  userVerify({ email, token, id }: UserVerifyEmailDto): void {
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('EMAIL_ADMIN'),
        subject: 'Mogakco forwards Autentication to your email 🥰',
        encoding: 'utf8',
        template: join(__dirname, '/email', 'user-verify'),
        context: {
          id,
          to: email,
          verifyToken: token,
          isDev: this.configService.get('NODE_ENV') === 'development',
          port: this.configService.get('SERVER_PORT'),
        },
      })
      .then(emailSuccess)
      .catch(emailFailure);
  }
}
