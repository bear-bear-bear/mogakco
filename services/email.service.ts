import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { emailFailure, emailSuccess } from '../lib/backend/log';
import { ConfigService } from '@nestjs/config';

interface UserVerifyEmailDTO {
  to: string;
  verifyToken: string;
}

@Injectable()
export default class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public userVerify({ to, verifyToken }: UserVerifyEmailDTO): void {
    this.mailerService
      .sendMail({
        to,
        from: this.configService.get('EMAIL_ADMIN'),
        subject: 'Mogakco forwards Autentication to your email 🥰',
        encoding: 'utf8',
        template: 'user-verify',
        context: {
          to,
          verifyToken,
          isDev: this.configService.get('NODE_ENV') === 'development',
          port: this.configService.get('SERVER_PORT'),
        },
      })
      .then(emailSuccess)
      .catch(emailFailure);
  }
}
