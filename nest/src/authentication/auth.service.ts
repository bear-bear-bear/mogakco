import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ICookieProps, IJwtPayload, JwtUserProps } from '@typing/auth';
import { addMinutes, millisecondsToMinutes } from 'date-fns';
import { IncomingHttpHeaders } from 'http';
import makeHash from '@common/helpers/make-hash.helper';
import jwtVerifyPromise from '@common//helpers/jwt-promise.helper';
import UserVerifyRepository from '@models/user/repositories/user-verify.repository';
import UserRepository from '@models/user/repositories/user.repository';
import UserEntity from '@models/user/entities/user.entity';
import UserService from '@models/user/user.service';
import CreateUserDto from '@authentication/dto/create-user.dto';
import AuthValidateService from '@authentication/auth-validate.service';

@Injectable()
export default class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private authValidateService: AuthValidateService,
    private jwtService: JwtService,
    private userVerifyRepository: UserVerifyRepository,
    private userRepository: UserRepository,
  ) {}

  /**
   * @desc id 에 대응하는 사용자의 refreshToken 을 제거한다.
   */
  removeRefreshToken(id: number): void {
    this.userRepository.update(id, {
      hashedRefreshToken: null,
    });
  }

  /**
   * @return AccessToken 을 생성하여 쿠키 정보와 함께 반환한다.
   */
  getAccessToken({ id, username }: JwtUserProps): string {
    const accessTokenExpirationTime = Number(
      this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    );
    const payload = { id, username };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${accessTokenExpirationTime}s`,
      algorithm: 'HS256',
    });
  }

  /**
   * @return RefreshToken 을 생성하여 객체정보로 반환한다.
   */
  getRefreshTokenCookie({ id, username }: JwtUserProps): ICookieProps {
    const refreshTokenExpirationTime = Number(
      this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    );
    const payload = { id, username };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${refreshTokenExpirationTime}s`,
    });

    return {
      token,
      maxAge: 6.048e8,
      path: '/',
      httpOnly: true,
    } as ICookieProps;
  }

  /**
   * @return RefreshToken 검증 후, 사용자 정보 객체를 반환합니다.
   */
  async getUserIfRefreshTokenMatches(refreshToken: string, id: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne(id);
    if (!user) return null;
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken as string,
    );
    if (isRefreshTokenMatching) return user;
    return null;
  }

  /**
   * @return 사용자 정보를 입력받아 다양한 예외를 처리하고, 생성정보를 반환합니다.
   */
  async join(dto: CreateUserDto) {
    const { username, password, email, skills, job } = dto;
    await this.authValidateService.validateJoin(dto);

    const user = await this.userRepository.createUserOne({
      username,
      password: await makeHash(password),
      email,
      skills,
      job: job ? job.id : null,
    } as CreateUserDto);

    const { id } = user;
    const { password: pw, hashedRefreshToken, ...userProps } = user;
    const accessToken = this.getAccessToken({
      id,
      username,
    } as JwtUserProps);
    const refreshTokenCookieSet = this.getRefreshTokenCookie({ id, username } as JwtUserProps);
    await this.saveHashRefreshToken(refreshTokenCookieSet.token, email);
    return {
      message: '유저가 생성되었습니다.',
      statusCode: 201,
      accessToken,
      refreshTokenCookieSet,
      user: userProps,
    };
  }

  /**
   * @desc RefreshToken 을 사용자 정보에 저장합니다.
   */
  async saveHashRefreshToken(refreshToken: string, email: string): Promise<void> {
    const hashedToken = await bcrypt.hash(refreshToken, 12);
    await this.userRepository.update(
      { email },
      {
        hashedRefreshToken: hashedToken,
      },
    );
  }

  /**
   * @desc id 에 대응하는 유저정보에 대한 RefreshToken 을 검증합니다.
   */
  async getUserIfTokenMatches(refreshToken: string, id: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne(id);
    if (user?.hashedRefreshToken) {
      const isMatch = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  /**
   * @desc JWT AccessToken 에 대한 유효시간을 구해서 현재 시간에서 유효시간이 지난 시간을 반환합니다.
   */
  getAccessTokenExpirationTime(): Date {
    const accessTokenExpirationTime = this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    ) as string;
    const minutes = millisecondsToMinutes(Number(`${accessTokenExpirationTime}000`));
    return addMinutes(new Date(), minutes);
  }

  getAccessTokenByHeaders(headers: IncomingHttpHeaders): string | undefined {
    return headers.authorization?.split(' ')[1];
  }

  async getAuthentication(accessToken: string) {
    try {
      const secretKey = this.configService.get('JWT_ACCESS_TOKEN_SECRET') as string;
      const decodedToken = (await jwtVerifyPromise(accessToken, secretKey)) as IJwtPayload;
      const user = await this.userRepository.findUserShallow(decodedToken.id);
      return { isLoggedIn: true, user };
    } catch {
      return { isLoggedIn: false };
    }
  }
}
