import { Module } from '@nestjs/common';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

@Module({
  imports: [UserService],
  providers: [AuthService],
})
class AuthModule {}

export default AuthModule;
