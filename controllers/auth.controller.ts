import {
  Get,
  Post,
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
  HttpException,
  Redirect,
  Param,
  HttpCode,
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
  getTest() {
    return '준재형 지용이형 열심히 힘내서 달립시다. 수익내야죠?';
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
   * @desc 회원가입 컨트롤러 입니다.
   * @returns 성공적으로 회원가입 된 사용자 객체
   * @author galaxy4276
   */
  @Post()
  async join(@Body() user: createUserDTO): Promise<response> {
    const message = await this.userService.join(user);
    return message;
  }

  /**
   * @desc 사용자가 회원가입 전에, 인증 메일을 거쳐가는 단계 입니다.
   * @author galaxy4276
   * @param email required. ex ) galaxyhi4276@gmail.com
   */
  @Post('/send-token/before-register')
  @HttpCode(200)
  async sendTokenBeforeRegister(@Body('email') email: string) {
    this.authService.verifyEmailRequest(email);

    try {
      const {
        token,
        email: destinatedEmail,
        id,
      } = await this.userService.getEmailVerifyToken(email);
      this.emailService.userVerify({
        email: destinatedEmail,
        token,
        id,
      });
    } catch (e) {
      prepareFailure(e);
    }

    return {
      statusCode: HttpStatus.OK,
      message: `이메일 전송 성공`,
    };
  }

  @Get('/verify-email')
  @Redirect('http://localhost:3000/signup', 302)
  async processVerifyEmail(
    @Query()
    { id, token }: { id: string; token: string },
  ) {
    await this.userService.verifyEmail(id, token);

    return {
      url: `http://localhost:3000/signup?id=${id}`,
    };
  }

  @Get('/is-verified/before-register')
  @HttpCode(200)
  async lastCheckingBeforeRegister(@Query('id') id: string) {
    if (!id) {
      throw new HttpException('id 인자가 없습니다.', HttpStatus.BAD_REQUEST);
    }
    const verification = await this.userService.lastCheckingEmailVerify(id);

    if (!verification) {
      throw new HttpException(
        '인증에 실패하였습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      statusCode: 200,
      message: verification.isVerified,
    };
  }

  /**
   * @desc 사용자 정보를 반환합니다.
   * @author quavious
   */
  @Post('/account')
  @UseGuards(JwtAuthGuard)
  async account(@Req() req: Request) {
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
  async refresh(
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
  async logout(@Req() req: Request, @Res() res: Response) {
    res.setHeader('Set-Cookie', `x-token=; HttpOnly; Path=/; Max-Age=0`);
    return res.status(200).json({
      message: 'logout',
      statusCode: HttpStatus.OK,
    });
  }

  @Get('/me')
  // ERROR Unknown column 'NaN' in 'where clause'
  async requestData(@Req() req: Request) {
    console.log(req.user);
    return {
      message: '1',
      statusCode: HttpStatus.OK,
    };
  }
}

export default AuthController;
