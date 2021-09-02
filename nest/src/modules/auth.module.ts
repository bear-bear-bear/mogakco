import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import JwtStrategy from '../services/passport/jwt.strategy';
import AuthService from '../services/auth.service';
import JwtStrategyWithRefresh from '../services/passport/jwt.refresh.strategy';
import AuthController from '../controllers/auth.controller';
import EmailService from '../services/email.service';
import UserRepository from '../models/repositories/user.repository';
import UserVerifyRepository from '../models/repositories/user-verify.repository';
import UserJobRepository from '../models/repositories/ user-job.reposity';
import UserModule from './user.module';

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
