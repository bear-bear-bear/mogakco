import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import UserService from './user.service';

type GetUserType = {
  id: number;
  username: string;
  password: string;
  email: string;
};

@Injectable()
class AuthService {
  constructor(private userService: UserService) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user: GetUserType = (await this.userService.findUserByName(
      username,
    )) as GetUserType;
    const hash = await compare(password, user?.password);

    if (!hash && !user) {
      return new HttpException(
        '아이디 또는 비밀번호가 틀렸습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (user && hash) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

export default AuthService;
