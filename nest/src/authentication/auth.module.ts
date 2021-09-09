import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import EmailService from '@mail/email.service';
import UserRepository from '@models/user/repositories/user.repository';
import UserVerifyRepository from '@models/user/repositories/user-verify.repository';
import UserJobRepository from '@models/user/repositories/ user-job.reposity';
import UserModule from '@models/user/user.module';

import AuthController from './auth.controller';
import JwtModule from '@authentication/jwt.module';
import NonAuthGuard from '@common/guards/non-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserVerifyRepository, UserRepository, UserJobRepository]),
    JwtModule,
    UserModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [ConfigService, EmailService, NonAuthGuard],
  exports: [],
})
export default class AuthModule {}
