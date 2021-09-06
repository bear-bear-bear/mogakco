import {
  Get,
  Post,
  Body,
  Controller,
  UseGuards,
  Req,
  Res,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  HttpStatus,
  HttpException,
  Redirect,
  HttpCode,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

import UserEntity from '@models/user/entities/user.entity';
import UserService from '@models/user/user.service';
import ParseJoinPipe from '@common/pipes/parse-join-pipe';
import EmailService from '@mail/email.service';
import JwtAuthGuard from '@common/guards/jwt-auth.guard';
import NonAuthGuard from '@common/guards/non-auth.guard';
import JwtAuthGuardWithRefresh from '@common/guards/jwt-refresh.guard';

import LoginUserDto from './dto/login-user.dto';
import CreateUserDto from './dto/create-user.dto';
import AuthService from './auth.service';
import {
  AccessTokenSwagger,
  BeforeRegisterSwagger,
  LoginSwagger,
  LogoutSwagger,
  SendTokenSwagger,
  SignOutSwagger,
  VerifyEmailSwagger,
} from '@common/decorators/swagger/auth.decorator';
import { ServerMessage } from '@common/helpers/enum.helper';

/**
 * @desc 회원가입/로그인에 대한 처리 컨트롤러
 */
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
class AuthController {
  private logger = new Logger();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  /**
   * @returns 사용자 accessToken, 정보를 반환한다.
   */
  @Get('/test')
  @UseGuards(JwtAuthGuard)
  getTest(@Req() req: Request) {
    return {
      user: req.user,
    };
  }

  /**
   * @returns 로그인을 수행하고 로그인 정보를 반환합니다.
   */
  @LoginSwagger()
  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() { email, password: plainPassword }: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(email, plainPassword);
    const accessToken = this.authService.getAccessToken(user);
    const { token: refreshToken, ...refreshCookieOptions } =
      this.authService.getRefreshTokenCookie(user);
    await this.authService.saveHashRefreshToken(refreshToken, email);

    const expiration = this.authService.getAccessTokenExpirationTime();

    res.cookie('refreshToken', refreshToken, {
      ...refreshCookieOptions,
    });

    return {
      statusCode: 200,
      message: '로그인에 성공하였습니다!',
      user,
      expiration,
      accessToken,
    };
  }

  /**
   * @return 로그아웃을 요청한 리퀘스트 유저 정보에 대한 DB 항목에서 refreshToken 을 제거하고,
   * 쿠키 값을 초기화 후 응답을 전송합니다.
   */
  @LogoutSwagger()
  @UseGuards(JwtAuthGuardWithRefresh)
  @Post('/logout')
  @HttpCode(200)
  async logout(@Req() req: { user: UserEntity }, @Res({ passthrough: true }) res: Response) {
    await this.authService.removeRefreshToken(req.user.id);
    res.clearCookie('refreshToken');
    return {
      message: `${req.user.username} 유저가 로그아웃 되었습니다.`,
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * @returns accessToken 을 갱신하여 반환합니다.
   */
  @AccessTokenSwagger()
  @Get('/refresh-token')
  @HttpCode(201)
  @UseGuards(JwtAuthGuardWithRefresh)
  async refresh(@Req() req: Request) {
    const { id } = req.user as UserEntity;
    const user = await this.userService.findUserForLogin(id);
    if (user === null) throw new InternalServerErrorException();
    const { password: notUsingProp, ...userProps } = user;
    const accessToken = this.authService.getAccessToken(userProps);
    const expiration = this.authService.getAccessTokenExpirationTime();
    return {
      accessToken,
      expiration,
      message: 'accessToken 갱신 완료!',
      statusCode: HttpStatus.CREATED,
      user: userProps,
    };
  }

  /**
   * @desc 회원가입 컨트롤러 입니다.
   * @returns 성공적으로 회원가입 된 사용자 객체
   */
  @SignOutSwagger()
  @UseGuards(NonAuthGuard)
  @Post()
  async join(@Body(ParseJoinPipe) info: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    try {
      const { accessToken, statusCode, message, refreshTokenCookieSet, user } =
        await this.authService.join(info);
      const { token, ...refreshOptions } = refreshTokenCookieSet;
      res.cookie('refreshToken', token, {
        ...refreshOptions,
      });
      const expiration = this.authService.getAccessTokenExpirationTime();
      return { statusCode, message, accessToken, expiration, user };
    } catch (err) {
      this.logger.error(err);
      new InternalServerErrorException(ServerMessage.INTERVAL);
    }
  }

  /**
   * @returns 이메일 전송 여부에 대한 객체를 반환한다.
   */
  @SendTokenSwagger()
  @Post('/send-token/before-register')
  @HttpCode(200)
  async sendTokenBeforeRegister(@Body('email') email: string) {
    try {
      this.authService.verifyEmailRequest(email);

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

      return {
        statusCode: HttpStatus.OK,
        message: '이메일 전송 성공',
      };
    } catch (err) {
      this.logger.error(err);
      new InternalServerErrorException(ServerMessage.INTERVAL);
    }
  }

  /**
   * @redirect 이메일 인증 검증 여부와 함께 회원가입 페이지로 리다이렉션한다.
   */
  // TODO: Domain ( Production )
  @BeforeRegisterSwagger()
  @Get('/verify-email/before-register')
  @Redirect(`http://localhost:3000/sign-up/required`, 307)
  async processVerifyEmail(
    @Query()
    { id, token }: { id: string; token: string },
  ) {
    const redirection = `http://localhost:${this.configService.get(
      'FRONTEND_PORT',
    )}/sign-up/required`;
    const verification = await this.authService.verifyEmail(id, token);
    if (!verification) {
      return { url: `${redirection}?success=false` };
    }

    const { email } = verification;
    return { url: `${redirection}?email=${email}&success=true` };
  }

  /**
   * @returns 사용자가 이메일인증을 수행했는지에 대한 여부를 반환한다.
   */
  @VerifyEmailSwagger()
  @Get('/is-verified/before-register')
  @HttpCode(200)
  async lastCheckingBeforeRegister(@Query('email') email: string) {
    this.authService.verifyEmailRequest(email);

    const verification = await this.authService.lastCheckingEmailVerify(email);

    if (typeof verification === 'boolean' || !verification.isVerified) {
      throw new HttpException('인증에 실패하였습니다.', HttpStatus.UNAUTHORIZED);
    }

    return {
      statusCode: 200,
      message: verification.isVerified,
      email,
    };
  }

  /**
   * @Deprecated
   */
  @Get('/user')
  async getAuthentication(@Req() { headers }: Request) {
    const accessToken = this.authService.getAccessTokenByHeaders(headers);
    if (accessToken === undefined) {
      return { isLoggedIn: false };
    }
    const { isLoggedIn, user } = await this.authService.getAuthentication(accessToken);
    return !isLoggedIn ? { isLoggedIn } : { isLoggedIn, ...user };
  }
}

export default AuthController;
