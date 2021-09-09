import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '@typing/auth';
import AuthService from '../auth.service';

/**
 *
 * @desc refresh-token 을 사용해 jwt 검증
 * validate 메소드에서 리프레시 토큰과 이메일을 가지고 검증한다.
 */

@Injectable()
export default class JwtStrategyWithRefresh extends PassportStrategy(Strategy, 'jwt-with-refresh') {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([request => request?.cookies?.refreshToken]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, { id }: IJwtPayload) {
    const { refreshToken } = request?.cookies;
    if (!refreshToken) throw new UnauthorizedException();
    const user = await this.authService.getUserIfTokenMatches(refreshToken, id);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
