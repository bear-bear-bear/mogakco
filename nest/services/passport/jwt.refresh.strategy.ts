import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import AuthService from '@services/auth.service';
import { ConfigService } from '@nestjs/config';

/**
 *
 * refresh-token을 사용해 jwt 검증
 * validate 메소드에서 리프레시 토큰과 이메일을 가지고 검증한다.
 */
@Injectable()
class JwtStrategyWithRefresh extends PassportStrategy(Strategy, 'jwt-with-refresh') {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refreshToken;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const { refreshToken } = request.cookies;
    const user = this.authService.getUserIfTokenMatches(refreshToken, payload.id);
    return user;
  }
}

export default JwtStrategyWithRefresh;
