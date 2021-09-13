import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserVerifyEmailDto } from '@typing/auth';

// interface UserVerifyEmailDTO {
//   email: string;
//   token: string;
//   id: number;
// }

@Injectable()
export default class EmailService {
  private readonly logger = new Logger('MailService');

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * @desc 사용자에게 이메일을 전송합니다.
   */
  async sendEmail({ email, token, id }: UserVerifyEmailDto): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get('EMAIL_ADMIN'),
      subject: 'Mogakco forwards Autentication to your email 🥰',
      encoding: 'utf8',
      template: join(__dirname, 'assets', 'user-verify'),
      context: {
        id,
        to: email,
        verifyToken: token,
        isDev: this.configService.get<string>('NODE_ENV') === 'development',
        domain: this.configService.get<string>('FRONTEND_PORT'),
        port: this.configService.get<number>('SERVER_PORT'),
      },
    });
    this.logger.log(`${email} 에게 ${token} 이 포함된 메일을 발송하였습니다.`);
  }
}
