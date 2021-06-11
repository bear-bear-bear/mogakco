import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GuardReturnType } from '@typing/auth';

export default class NonAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): GuardReturnType {
    const request = context.switchToHttp().getRequest();
    const { accessToken }: { accessToken: string | undefined } = request.cookies;

    if (accessToken) {
      throw new UnauthorizedException('로그인 상태에서 접근할 수 없습니다.');
    }
    return true;
  }
}
