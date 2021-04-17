import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import JwtStrategy from 'services/passport/jwt.strategy';
import AuthService from 'services/auth.service';
import JwtStrategyWithRefresh from 'services/passport/jwt.refresh.strategy';
import UserModule from './user.module';
import AuthController from '../controllers/auth.controller';
import EmailService from '../services/email.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({}),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtStrategyWithRefresh, EmailService],
  exports: [JwtStrategy, JwtStrategyWithRefresh, PassportModule],
})
class AuthModule {}

export default AuthModule;
