import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserVerifyEmailDto } from '@typing/auth';
import { ServerEnviroment } from '@common/helpers/enum.helper';

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
   * @desc 이메일로 전송할 서버 주소를 반환합니다.
   */
  getUrl() {
    const mode = this.configService.get<string>('NODE_ENV');
    const port = this.configService.get<number>('SERVER_PORT');
    if (mode === ServerEnviroment.TEST) {
      const url = this.configService.get<string>('TEST_FRONTEND_URL');
      return `${url}:${port}`;
    }
    if (mode === ServerEnviroment.PROD) {
      const url = this.configService.get<string>('PROD_FRONTEND_URL');
      return `${url}:${port}`;
    }
    return `http://localhost:${port}`;
  }

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
        url: this.getUrl(),
      },
    });
    this.logger.log(`${email} 에게 ${token} 이 포함된 메일을 발송하였습니다.`);
  }
}
