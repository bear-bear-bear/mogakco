import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import LoginUserDTO from 'models/dto/login-user.dto';
import { JwtPayload } from './passport/jwt.payload';
import UserService from './user.service';

type GetUserType = {
  id: number;
  username: string;
  password: string;
  email: string;
};

@Injectable()
class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new BadRequestException();
    const hash = await bcrypt.compare(password, user?.password);
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

  public async validate(loginUserDTO: LoginUserDTO) {
    const { email, password } = loginUserDTO;
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();
    return user;
  }

  public getCookieWithAccessToken(email: string) {
    const payload: JwtPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: 'ACCESS_TOKEN_!@#',
      expiresIn: '10m',
    });
    const cookie = `x-token=${token}; HttpOnly; Path=/; Max-Age=${10 * 60}`;
    return { cookie };
  }

  public getCookieWithRefreshToken(email: string) {
    const payload: JwtPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: 'REFRESH_TOKEN_!@#',
      expiresIn: '7d',
    });
    const cookie = `refresh-token=${token}; HttpOnly; Path=/; Max-Age=${
      7 * 24 * 60 * 60
    }`;
    return {
      cookie,
      token,
    };
  }
}

export default AuthService;
