import {
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Controller,
  UseGuards,
  UseFilters,
  UnauthorizedException,
  Req,
  Res,
  UseInterceptors,
  ClassSerializerInterceptor,
  ValidationPipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import JwtAuthGuard from 'services/passport/jwt.guard';
import JwtAuthGuardWithRefresh from 'services/passport/jwt.refresh.guard';
import AuthService from 'services/auth.service';
import User from 'models/entities/user';
import UserService from '../services/user.service';
import createUserDTO from '../models/dto/create-user.dto';
import response from './dto/response';
import LoginBadRequestException from './exception/login.exception';
import LoginUserDTO from '../models/dto/login-user.dto';
import updateUserRequestDto from "../test/unit/services/dto/update-user-request.dto";

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // test Get Controller
  @Get('/test')
  public getTest() {
    return encodeURIComponent(
      '준재형 지용이형 열심히 힘내서 달립시다. 수익내야죠?',
    );
  }

  @Post('/login')
  @UseFilters(LoginBadRequestException)
  async login(
    @Body(ValidationPipe) req: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validate(req);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, hashedRefreshToken, ...props } = user;
    const {
      cookie: accessTokenCookie,
    } = this.authService.getCookieWithAccessToken(user.email);
    const {
      cookie: refreshTokenCookie,
      token,
    } = this.authService.getCookieWithRefreshToken(user.email);
    await this.userService.hashRefreshToken(token, user.email);
    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return {
      message: 'Token Generated',
      user: props,
    };
  }

  @Post()
  async join(@Body() user: createUserDTO): Promise<response> {
    const res = await this.userService.join(user);
    return res;
  }

  /**
   *
   * @param req 쿼리스트링의 토큰 아이디와 토큰이 주어집니다.
   * @returns
   * 아이디와 토큰을 보내서 토큰이 일치하면 토큰을 분해
   * 사용자 아이디를 얻어서 verified_at만 갱신
   * 시간이 너무 지나 실패하면 false 반환, 이메일 다시 보냅니다.
   */
  @Get('/verify-email')
  async verify(@Query() req: { id: string; verify: string }) {
    const { id, verify } = req;
    const flag = await this.userService.verifyUserWithToken(
      parseInt(id, 10),
      verify,
    );
    if (!flag) {
      return {
        message: 'Not Verified. 이메일을 다시 보냈습니다.',
      };
    }
    return {
      message: 'Vetified',
    };
  }

  /**
   *
   * @param req
   * 가입은 되어있지만 이메일 인증이 안되어있을 때 Post 요청으로 다시 이메일 전송
   * JWT 토큰을 통해 사용자 이메일 얻을 수 있음.
   */
  @Post('/resend-email')
  @UseGuards(JwtAuthGuard)
  async reVerify(@Req() req: Request) {
    const { email } = req.user as any;
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.verifiedAt) {
      return {
        message: '이미 겅증되어있습니다.',
      };
    }
    await this.userService.resendEmail(user);
    return {
      message: '이메일을 다시 발송합니다.',
    };
  }

  @Get('/:id')
  findUserOne(@Param('id') id: number) {
    const findUser = this.userService.findUserOne(id);
    return findUser;
  }

  @Get('/:username')
  async findUserByName(@Param('username') username: string) {
    const findUser = await this.userService.findUserByName(username);
    return findUser;
  }

  @Delete(':id')
  deleteUserOne(@Param('id') id: number) {
    const deleteUser = this.userService.deleteUser(id);
    return deleteUser;
  }

  @Patch(':id')
  updateUserOne(@Body() user: updateUserRequestDto) {
    const updateUser = this.userService.updateUserOne(user);
    return updateUser;
  }

  @Post('/account')
  @UseGuards(JwtAuthGuard)
  public async account(@Req() req: Request) {
    const { email } = req.user as any;
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, hashedRefreshToken, ...props } = user;
    return {
      message: 'Authenticated',
      user: props,
    };
  }

  @Post('/refresh-token')
  @UseGuards(JwtAuthGuardWithRefresh)
  public async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const { email } = req.user as User;
    const {
      cookie: accessTokenCookie,
    } = this.authService.getCookieWithAccessToken(email);
    const { password, hashedRefreshToken, ...props } = req.user as User;
    res.setHeader('Set-Cookie', accessTokenCookie);
    return {
      message: 'Authenticated & Refreshed',
      user: props,
    };
  }

  @UseGuards(JwtAuthGuardWithRefresh)
  @Post('/logout')
  public async logout(@Req() req: Request, @Res() res: Response) {
    res.setHeader('Set-Cookie', `x-token=; HttpOnly; Path=/; Max-Age=0`);
    return res.status(200).json({
      message: 'logout',
    });
  }

  @Get('/me')
  // ERROR Unknown column 'NaN' in 'where clause'
  public async requestData(@Req() req: Request) {
    console.log(req.user);
    return {
      message: '1',
    };
  }
}

export default AuthController;
