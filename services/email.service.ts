import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export default class EmailService {
  constructor(private readonly mailerService: MailerService) {}
}
