import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import EmailService from '@mail/email.service';
import UserModule from '@models/user/user.module';

import AuthController from '../auth.controller';
import JwtModule from './jwt.module';
import NonAuthGuard from '@common/guards/non-auth.guard';
import SharedModule from './shared.module';

/**
 * @desc 인증에 관련된 핵심 모듈입니다.
 */
@Module({
  imports: [SharedModule, JwtModule, UserModule, ConfigModule],
  controllers: [AuthController],
  providers: [ConfigService, EmailService, NonAuthGuard],
  exports: [],
})
export default class AuthModule {}
