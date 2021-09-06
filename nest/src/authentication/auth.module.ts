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

@Module({
  imports: [
    TypeOrmModule.forFeature([UserVerifyRepository, UserRepository, UserJobRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
        },
      }),
    }),
    UserModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [ConfigService, AuthService, JwtStrategy, JwtStrategyWithRefresh, EmailService],
  exports: [AuthService, JwtStrategy, JwtStrategyWithRefresh, EmailService],
})
class AuthModule {}

export default AuthModule;
