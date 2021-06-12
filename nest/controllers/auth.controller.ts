import {
  Get,
  Post,
  Body,
  Controller,
  UseGuards,
  UnauthorizedException,
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
} from '@nestjs/common';
import { Request, Response } from 'express';
import JwtAuthGuardWithRefresh from '@services/passport/jwt.refresh.guard';
import AuthService from '@services/auth.service';
import UserEntity from '@models/entities/user.entity';
import UserService from '@services/user.service';
import EmailService from '@services/email.service';
import ParseJoinPipe from '@controllers/pipe/parse-join-pipe';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, LoginUserDto } from '@typing/auth';
import JwtAuthGuard from '../guard/jwt-auth.guard';
import NonAuthGuard from '../guard/non-auth.guard';

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
    private configService: ConfigService,
  ) {}

  /**
   * @desc 테스트 전용 컨트롤러 입니다.
   * jest 에서 서버가 원활하게 작동하는 지 수행합니다.
   */
  @UseGuards(JwtAuthGuard)
  @Get('/test')
  getTest(@Req() req: Request) {
    return {
      cookies: req.cookies,
      user: req.user,
    };
  }

  /**
   * @returns 로그인을 수행하고 로그인 정보를 반환합니다.
   */
  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() { email, password: plainPassword }: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = await this.authService.validateUser(email, plainPassword);
      const { token: accessToken, ...accessTokenCookieOptions } =
        this.authService.getCookieWithAccessToken(user);
      const refreshToken = this.authService.getRefreshToken(user);
      await this.authService.saveHashRefreshToken(refreshToken, email);

      res.cookie('accessToken', accessToken, {
        ...accessTokenCookieOptions,
      });
      return {
        statusCode: 200,
        message: '로그인에 성공하였습니다!',
        user,
        refreshToken,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('서버 에러가 발생했습니다.');
    }
  }

  /**
   * @return 로그아웃을 요청한 리퀘스트 유저 정보에 대한 DB 항목에서 refreshToken 을 제거하고,
   * 쿠키 값을 초기화 후 응답을 전송합니다.
   */
  @UseGuards(JwtAuthGuardWithRefresh)
  @Post('/logout')
  async logout(@Req() req: { user: UserEntity }, @Res({ passthrough: true }) res: Response) {
    await this.authService.removeRefreshToken(req.user.id);
    res.cookie('accessToken', null);
    return {
      message: `${req.user.username} 유저가 로그아웃 되었습니다.`,
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * @desc refresh-token 을 갱신하여 반환합니다.
   */
  @Get('/refresh-token')
  @HttpCode(201)
  @UseGuards(JwtAuthGuardWithRefresh)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { id } = req.user as UserEntity;
    const user = await this.userService.findUserForLogin(id);
    if (user === null) throw new InternalServerErrorException();
    const { password: notUsingProp, ...userProps } = user;
    const { token: accessToken, ...cookieOptions } =
      this.authService.getCookieWithAccessToken(userProps);
    res.cookie('accessToken', accessToken, cookieOptions);
    return {
      message: 'accessToken 갱신 완료!',
      statusCode: HttpStatus.CREATED,
      user: userProps,
    };
  }

  /**
   * @desc 회원가입 컨트롤러 입니다.
   * @returns 성공적으로 회원가입 된 사용자 객체
   */
  @UseGuards(NonAuthGuard)
  @Post()
  async join(@Body(ParseJoinPipe) user: CreateUserDto) {
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

    const { token, email: destinatedEmail, id } = await this.authService.getEmailVerifyToken(email);
    this.emailService.userVerify({
      email: destinatedEmail,
      token,
      id,
    });

    return {
      statusCode: HttpStatus.OK,
      message: '이메일 전송 성공',
    };
  }

  // TODO: Domain ( Production ) Required
  @Get('/verify-email/before-register')
  @Redirect(`http://localhost:3000/signup`, 302)
  async processVerifyEmail(
    @Query()
    { id, token }: { id: string; token: string },
  ) {
    const redirection = `http://localhost:${this.configService.get('FRONTEND_PORT')}/signup`;
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
    this.authService.verifyEmailRequest(email);

    const verification = await this.authService.lastCheckingEmailVerify(email);

    if (typeof verification === 'boolean' || !verification.isVerified) {
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
}

export default AuthController;
