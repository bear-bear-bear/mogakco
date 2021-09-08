import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '@typing/auth';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  validate({ id, username }: IJwtPayload) {
    return { id, username };
  }
}
