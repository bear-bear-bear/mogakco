import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import JwtStrategy from 'services/passport/jwt.strategy';
import AuthService from 'services/auth.service';
import UserModule from './user.module';
import AuthController from '../controllers/auth.controller';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: 3600 },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
class AuthModule {}

export default AuthModule;
