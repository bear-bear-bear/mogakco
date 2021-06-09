import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GuardReturnType } from '@controllers/type/guard-type';

export default class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): GuardReturnType {
    const request = context.switchToHttp().getRequest();
    const { accessToken }: { accessToken: string | undefined } = request.cookies;

    if (accessToken === undefined) {
      throw new UnauthorizedException('토큰 정보가 존재하지 않습니다.');
    }
    return true;
  }
}
