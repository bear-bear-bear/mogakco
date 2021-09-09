import {
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GuardReturnType } from '@typing/auth';
import UserEntity from '@models/user/entities/user.entity';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard('jwt-with-refresh') {
  private logger = new Logger('JwtRefreshGuard');

  canActivate(context: ExecutionContext): GuardReturnType {
    return super.canActivate(context);
  }

  // unused 로 잡지만, Framework 가 실행함
  // @ts-ignore
  handleRequest(err: Error, user: UserEntity | null) {
    if (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
    const isUser = typeof user?.id === 'number';
    if (!isUser) {
      this.logger.error('유저가 없음 401');
      throw new UnauthorizedException();
    }
    return user;
  }
}
