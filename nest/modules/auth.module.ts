import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import JwtStrategy from '@services/passport/jwt.strategy';
import AuthService from '@services/auth.service';
import JwtStrategyWithRefresh from '@services/passport/jwt.refresh.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthController from '@controllers/auth.controller';
import EmailService from '@services/email.service';
import UserRepository from '@models/repositories/user.repository';
import UserVerifyRepository from '@models/repositories/user-verify.repository';
import UserJobRepository from '@models/repositories/ user-job.reposity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import UserModule from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserVerifyRepository, UserRepository, UserJobRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({}),
    UserModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtStrategyWithRefresh, EmailService, ConfigService],
  exports: [JwtStrategy, JwtStrategyWithRefresh, PassportModule],
})
class AuthModule {}

export default AuthModule;
