import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
interface UserVerifyEmailDTO {
    email: string;
    token: string;
    id: number;
}
export default class EmailService {
    private readonly mailerService;
    private readonly configService;
    constructor(mailerService: MailerService, configService: ConfigService);
    userVerify({ email, token, id }: UserVerifyEmailDTO): void;
}
export {};
