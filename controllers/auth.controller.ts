import {
  Get,
  Post,
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
  HttpStatus,
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
import EmailService from '../services/email.service';
import { prepareFailure } from '../lib/backend/log';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  /**
   * @desc 테스트 전용 컨트롤러 입니다.
   * jest 에서 서버가 원활하게 작동하는 지 수행합니다.
   * @author galaxy4276
   */
  @Get('/test')
  public getTest() {
    return encodeURIComponent(
      '준재형 지용이형 열심히 힘내서 달립시다. 수익내야죠?',
    );
  }

  /**
   * @returns 로그인을 수행하고 로그인 정보를 반환합니다.
   * @author quavious
   */
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  /**
   * @param 회원가입을 위한 유저 객체
   * @desc 회원가입 컨트롤러 입니다.
   * @returns 성공적으로 회원가입 된 사용자 객체
   * @author galaxy4276
   */
  @Post()
  async join(@Body() user: createUserDTO): Promise<response> {
    const res = await this.userService.join(user);
    return res;
  }

  /**
   * @desc 사용자가 회원가입 전에, 인증 메일을 거쳐가는 단계 입니다.
   * @author galaxy4276
   * @param email required. ex ) galaxyhi4276@gmail.com
   */
  @Post('/prepare')
  async prepareJoin(@Body('email') email: string) {
    try {
      const [verifyToken, to] = await this.userService.prepareJoin(email);
      this.emailService.userVerify({
        to,
        verifyToken,
      });
    } catch (e) {
      prepareFailure(e);
    }
    return {
      statusCode: HttpStatus.OK,
      message: `이메일 전송 성공`,
    };
  }

  /**
   * @param req 쿼리스트링의 토큰 이메일와 평문 토큰이 주어집니다.
   * @returns
   * @desc 이메일과 토큰을 보내서 토큰이 일치하면 불리언 값 반환
   * 시간이 너무 지나 실패하면 false 반환, 이 경우에는 다시 이메일 검증 페이지로 가서 백엔드에 요청해야 합니다.
   * 이메일이 중복되는 토큰 값이 있을 수 있기 때문에, 레코드의 ID 값까지 입력받습니다.
   * @author quavious
   */
  @Get('/verify-email')
  async verify(
    @Query() req: { id: string; email: string; verifyToken: string },
  ) {
    const { id, email, verifyToken } = req;
    const isVerified = await this.userService.verifyEmail(
      id,
      email,
      verifyToken,
    );
    if (!isVerified) {
      return {
        message: '토큰이 잘못되었거나, 요청 시간이 지났습니다.',
        statusCode: HttpStatus.FORBIDDEN,
        isVerified,
      };
    }
    return {
      message: '이메일 확인에 성공했습니다.',
      statusCode: HttpStatus.OK,
      isVerified,
    };
  }

  /**
   *
   * @param req
   * @desc 가입은 되어있지만 이메일 인증이 안되어있을 때 Post 요청으로 다시 이메일 전송
   * JWT 토큰을 통해 사용자 이메일 얻을 수 있음.
   * @author quavious
   */
  // @Post('/resend-email')
  // @UseGuards(JwtAuthGuard)
  // async reVerify(@Req() req: Request) {
  //   const { email } = req.user as any;
  //   const user = await this.userService.findUserByEmail(email);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   if (user.verifiedAt) {
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: '이미 겅증되어있습니다.',
  //     };
  //   }
  //   await this.userService.resendEmail(user);
  //   return {
  //     status: HttpStatus.OK,
  //     message: '이메일을 다시 발송합니다.',
  //   };
  // }

  /**
   * @deprecated will be remove
   * @author galaxy4276
   */
  @Get('/:id')
  findUserOne(@Param('id') id: number) {
    const findUser = this.userService.findUserOne(id);
    return findUser;
  }

  /**
   * @deprecated will be remove
   * @author galaxy4276
   */
  @Get('/:username')
  async findUserByName(@Param('username') username: string) {
    const findUser = await this.userService.findUserByName(username);
    return findUser;
  }

  /**
   * @desc 사용자 정보를 반환합니다.
   * @author quavious
   */
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
      statusCode: HttpStatus.OK,
      user: props,
    };
  }

  /**
   * @desc refresh-token 을 갱신하여 반환합니다.
   * @author quavious
   */
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
      statusCode: HttpStatus.OK,
      user: props,
    };
  }

  @UseGuards(JwtAuthGuardWithRefresh)
  @Post('/logout')
  public async logout(@Req() req: Request, @Res() res: Response) {
    res.setHeader('Set-Cookie', `x-token=; HttpOnly; Path=/; Max-Age=0`);
    return res.status(200).json({
      message: 'logout',
      statusCode: HttpStatus.OK,
    });
  }

  @Get('/me')
  // ERROR Unknown column 'NaN' in 'where clause'
  public async requestData(@Req() req: Request) {
    console.log(req.user);
    return {
      message: '1',
      statusCode: HttpStatus.OK,
    };
  }
}

export default AuthController;
