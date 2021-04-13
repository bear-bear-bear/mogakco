import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { emailSucessLog } from '../lib/backend/dev';

interface UserVerifyEmailDTO {
  to: string;
  username: string;
  hash: string;
}

@Injectable()
export default class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public userVerify({ to, username, hash }: UserVerifyEmailDTO): void {
    this.mailerService
      .sendMail({
        to,
        from: process.env.EMAIL_ADMIN,
        subject: 'Mogakco forwards Autentication to your email 🥰',
        template: 'user-verify',
        context: {
          username,
          to,
          hash,
        },
      })
      .then(email => emailSucessLog(email));
  }
}
