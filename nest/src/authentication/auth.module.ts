import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import EmailService from '@mail/email.service';
import UserRepository from '@models/user/repositories/user.repository';
import UserVerifyRepository from '@models/user/repositories/user-verify.repository';
import UserJobRepository from '@models/user/repositories/ user-job.reposity';
import UserModule from '@models/user/user.module';
import JwtStrategyWithRefresh from './strategies/jwt.refresh.strategy';
import JwtStrategy from './strategies/jwt.strategy';

import AuthController from './auth.controller';
import AuthService from './auth.service';
import AuthValidateService from '@authentication/auth-validate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserVerifyRepository, UserRepository, UserJobRepository]),
    PassportModule.register({
      defaultStrategy: ['jwt', 'jwt-with-refresh'],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string | number>('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
        },
      }),
    }),
    UserModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    ConfigService,
    AuthService,
    AuthValidateService,
    JwtStrategy,
    JwtStrategyWithRefresh,
    EmailService,
  ],
  exports: [AuthService],
})
export default class AuthModule {}
