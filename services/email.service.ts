import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { emailFailure, emailSuccess } from '../lib/backend/log';

interface UserVerifyEmailDTO {
  to: string;
  verifyToken: string;
}

@Injectable()
export default class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public userVerify({ to, verifyToken }: UserVerifyEmailDTO): void {
    this.mailerService
      .sendMail({
        to,
        from: process.env.EMAIL_ADMIN,
        subject: 'Mogakco forwards Autentication to your email 🥰',
        encoding: 'utf8',
        template: 'user-verify',
        context: {
          to,
          verifyToken,
          isDev: process.env.NODE_ENV === 'development',
          port: process.env.SERVER_PORT,
        },
      })
      .then(emailSuccess)
      .catch(emailFailure);
  }
}
