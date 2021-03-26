import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import JwtStrategy from 'services/passport/jwt.strategy';
import UserRepository from 'models/repositories/user.repository';
import UserController from 'controllers/user.controller';
import UserService from 'services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [UserController],
  providers: [JwtStrategy, UserService],
  exports: [JwtStrategy, PassportModule],
})
class AuthModule {}

export default AuthModule;
