import { forwardRef, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import JwtStrategy from '@authentication/strategies/jwt.strategy';
import JwtStrategyWithRefresh from '@authentication/strategies/jwt.refresh.strategy';
import SharedModule from './shared.module';
import JwtAdminStrategy from '@authentication/strategies/jwt-admin.strategy';

/**
 * @desc jwt 인증에 관한 모듈입니다.
 */
@Module({
  imports: [
    forwardRef(() => SharedModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
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
  ],
  providers: [JwtStrategy, JwtStrategyWithRefresh, JwtAdminStrategy],
  exports: [JwtStrategy, JwtStrategyWithRefresh, JwtAdminStrategy, PassportModule, NestJwtModule],
})
export default class JwtModule {}
