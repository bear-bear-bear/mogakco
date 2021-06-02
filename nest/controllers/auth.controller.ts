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
  HttpCode,
} from '@nestjs/common';
import { Request, Response } from 'express';
import JwtAuthGuard from 'services/passport/jwt.guard';
import JwtAuthGuardWithRefresh from 'services/passport/jwt.refresh.guard';
import AuthService from 'services/auth.service';
import UserEntity from '@models/entities/user.entity';
import { prepareFailure } from '@lib/log';
import UserService from '../services/user.service';
import createUserDTO from '../models/dto/create-user.dto';
import LoginBadRequestException from './exception/login.exception';
import LoginUserDTO from '../models/dto/login-user.dto';
import EmailService from '../services/email.service';

/**
 * @desc 회원가입/로그인에 대한 처리 컨트롤러
 */
@Controller('auth')
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
   */
  @Get('/test')
  getTest() {
    return '준재형 지용이형 열심히 힘내서 달립시다. 수익내야죠?';
  }

  /**
   * @returns 로그인을 수행하고 로그인 정보를 반환합니다.
   */
  @Post('/login')
  @UseFilters(LoginBadRequestException)
  async login(@Body(ValidationPipe) req: LoginUserDTO, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validate(req);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, hashedRefreshToken, ...props } = user;
    const { cookie: accessTokenCookie } = this.authService.getCookieWithAccessToken(user.email);
    const { cookie: refreshTokenCookie, token } = this.authService.getCookieWithRefreshToken(
      user.email,
    );
    await this.authService.hashRefreshToken(token, user.email);
    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return {
      message: 'Token Generated',
      user: props,
    };
  }

  /**
   * @desc 회원가입 컨트롤러 입니다.
   * @returns 성공적으로 회원가입 된 사용자 객체
   */
  @Post()
  async join(@Body() user: createUserDTO) {
    const message = await this.authService.join(user);
    return message;
  }

  /**
   * @desc 사용자가 회원가입 전에, 인증 메일을 거쳐가는 단계 입니다.
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
      } = await this.authService.getEmailVerifyToken(email);
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
      message: '이메일 전송 성공',
    };
  }

  @Get('/verify-email/before-register')
  @Redirect('http://localhost:3000/signup', 302)
  async processVerifyEmail(
    @Query()
    { id, token }: { id: string; token: string },
  ) {
    const redirection = 'http://localhost:3000/signup';
    const verification = await this.authService.verifyEmail(id, token);
    if (!verification) {
      return { url: `${redirection}?success=false` };
    }

    const { email } = verification;
    return { url: `${redirection}?email=${email}&success=true` };
  }

  @Get('/is-verified/before-register')
  @HttpCode(200)
  async lastCheckingBeforeRegister(@Query('email') email: string) {
    if (!email) {
      throw new HttpException('이메일 인자가 없습니다.', HttpStatus.BAD_REQUEST);
    }
    const verification = await this.authService.lastCheckingEmailVerify(email);

    if (!verification) {
      throw new HttpException('인증에 실패하였습니다.', HttpStatus.UNAUTHORIZED);
    }

    return {
      statusCode: 200,
      message: verification.isVerified,
    };
  }

  /**
   * @desc 사용자 정보를 반환합니다.
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
   */
  @Post('/refresh-token')
  @UseGuards(JwtAuthGuardWithRefresh)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const { email } = req.user as UserEntity;
    const { cookie: accessTokenCookie } = this.authService.getCookieWithAccessToken(email);
    const { password, hashedRefreshToken, ...props } = req.user as UserEntity;
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
    res.setHeader('Set-Cookie', 'x-token=; HttpOnly; Path=/; Max-Age=0');
    return res.status(200).json({
      message: 'logout',
      statusCode: HttpStatus.OK,
    });
  }
}

export default AuthController;
