import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import AuthService from '@services/auth.service';
import { JwtPayload } from './jwt.payload';

/**
 *
 * refresh-token을 사용해 jwt 검증
 * validate 메소드에서 리프레시 토큰과 이메일을 가지고 검증한다.
 */
@Injectable()
class JwtStrategyWithRefresh extends PassportStrategy(Strategy, 'jwt-with-refresh') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies['refresh-token'];
        },
      ]),
      secretOrKey: 'REFRESH_TOKEN_!@#',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const refreshToken = request.cookies['refresh-token'];
    const { email }: JwtPayload = payload;
    return this.authService.getUserIfTokenMatches(refreshToken, email);
  }
}

export default JwtStrategyWithRefresh;
