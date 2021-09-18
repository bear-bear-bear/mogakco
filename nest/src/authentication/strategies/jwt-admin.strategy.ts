import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '@typing/auth';
import { getManager } from 'typeorm';
import UserEntity from '@models/user/entities/user.entity';
import UserRolesEntity from '@models/user/entities/user-roles.entity';

@Injectable()
export default class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate({ id }: IJwtPayload) {
    const user = await getManager().findOne(
      UserEntity,
      { id },
      {
        select: ['id', 'username'],
      },
    );
    if (!user) throw new BadGatewayException('존재하지 않는 유저입니다.');
    const userRole = await getManager().findOne(UserRolesEntity, {
      where: {
        user,
      },
      relations: ['role'],
    });
    if (!userRole) throw new InternalServerErrorException('사용자 권한이 존재하지 않습니다');
    if (userRole.role.name === '관리자') {
      return user;
    }
    throw new UnauthorizedException('어드민 권한이 없습니다.');
  }
}
