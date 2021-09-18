import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * @desc 어드민으로 접근하는 유저인 지 검사합니다.
 */
@Injectable()
export default class AdminGuard extends AuthGuard('jwt-admin') {}
