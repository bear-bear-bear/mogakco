import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import JwtStrategy from 'services/passport/jwt.strategy';
import UserRepository from 'models/repositories/user.repository';
import AuthService from '../services/auth.service';
import LocalStrategy from '../services/passport/local.strategy';
import UserModule from './user.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, UserRepository],
  exports: [JwtStrategy, PassportModule],
})
class AuthModule {}

export default AuthModule;
