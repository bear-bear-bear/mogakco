import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import JwtStrategy from '@authentication/strategies/jwt.strategy';
import JwtStrategyWithRefresh from '@authentication/strategies/jwt.refresh.strategy';
import UserModule from '@models/user/user.module';
import AuthService from '@authentication/auth.service';
import AuthValidateService from '@authentication/auth-validate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserVerifyRepository from '@models/user/repositories/user-verify.repository';
import UserRepository from '@models/user/repositories/user.repository';
import UserJobRepository from '@models/user/repositories/ user-job.reposity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserVerifyRepository, UserRepository, UserJobRepository]),
    PassportModule.register({
      defaultStrategy: ['jwt', 'jwt-with-refresh'],
    }),
    NestJwtModule.registerAsync({
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
  ],
  providers: [JwtStrategy, JwtStrategyWithRefresh, AuthService, AuthValidateService],
  exports: [
    JwtStrategy,
    JwtStrategyWithRefresh,
    PassportModule,
    NestJwtModule,
    AuthService,
    AuthValidateService,
  ],
})
export default class JwtModule {}
