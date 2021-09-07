import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Strategy } from 'passport';
import { PassportStrategy } from '@nestjs/passport';
import AuthValidateService from '@authentication/auth-validate.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authValidateService: AuthValidateService) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.authValidateService.validateUser(email, password);
    if (!user) {
      throw new HttpException('아이디 또는 비밀번호가 틀렸습니다.', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
