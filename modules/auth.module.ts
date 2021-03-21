import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import AuthService from '../services/auth.service';
import LocalStrategy from '../services/passport/local.strategy';
import UserModule from './user.module';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
class AuthModule {}

export default AuthModule;
