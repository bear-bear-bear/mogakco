import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Strategy } from 'passport';
import { PassportStrategy } from '@nestjs/passport';
import AuthService from '../auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException('아이디 또는 비밀번호가 틀렸습니다.', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
