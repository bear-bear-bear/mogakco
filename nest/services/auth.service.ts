import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import makeHash from '@lib/makeHash';
import { v4 as uuidv4 } from 'uuid';
import UserVerifyEntity from '@models/entities/user-verify.entity';
import UserVerifyRepository from '@models/repositories/user-verify.repository';
import UserRepository from '@models/repositories/user.repository';
import UserJobRepository from '@models/repositories/ user-job.reposity';
import { ConfigService } from '@nestjs/config';
import UserEntity from '@models/entities/user.entity';
import { CreateUserDto, ICookieProps, JwtUserProps } from '@typing/auth';
import { addMinutes, millisecondsToMinutes } from 'date-fns';
import UserService from './user.service';

@Injectable()
class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
    private userVerifyRepository: UserVerifyRepository,
    private userRepository: UserRepository,
    private userJobRepository: UserJobRepository,
  ) {}

  /**
   * @return 로그인 성공 시 패스워드가 제외된 유저 정보 객체를 넘긴다.
   */
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUserByEmailForLogin(email);
    if (user === null) throw new BadRequestException('가입되지 않은 유저입니다.');
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }
    const { password: notUsingProp, ...returnProps } = user;
    return returnProps;
  }

  /**
   * @desc id 에 대응하는 사용자의 refreshToken 을 제거한다.
   */
  async removeRefreshToken(id: number) {
    await this.userRepository.update(id, {
      hashedRefreshToken: null,
    });
  }

  /**
   * @return AccessToken 을 생성하여 쿠키 정보와 함께 반환한다.
   */
  getAccessToken({ id, username }: JwtUserProps) {
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
  getRefreshTokenCookie({ id, username }: JwtUserProps) {
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
    } as ICookieProps;
  }

  /**
   * @return RefreshToken 검증 후, 사용자 정보 객체를 반환합니다.
   */
  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = (await this.userRepository.findOne(id)) as UserEntity;

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken as string,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
    return null;
  }

  /**
   * @return 이메일 형태를 검증합니다.
   */
  verifyEmailRequest(email: string | undefined) {
    if (!email) {
      throw new HttpException('이메일 필드가 존재하지 않습니다.', HttpStatus.BAD_REQUEST);
    }

    const isEmpty = email.trim() === '';
    const matcher = email.match(/\w+@\w+.\w{3}/);
    if (isEmpty || matcher === null) {
      throw new HttpException('이메일 형식이 아닙니다.', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @desc 이메일을 입력받습니다.
   * 이메일을 통해 이미 레코드가 있는지 보고, 레코드의 만료 날짜가 지났는지 검증합니다.
   * 만료 날짜가 아직 지나지 않았다면 기존에 생성된 레코드를 그대로 리턴할 것입니다.
   * 그렇지 않다면 새로운 레코드를 만들어서 프론트에 제공합니다.
   */
  async getEmailVerifyToken(email: string) {
    const now = new Date();
    const currentVerification = await this.userVerifyRepository.findOne({
      email,
    });
    const signedUser = await this.userRepository.findUserByEmail(email);
    if (signedUser) throw new BadRequestException('이미 가입한 유저입니다.');
    if (currentVerification?.expiredAt) {
      const { expiredAt, id, token } = currentVerification;
      if (expiredAt < now) await this.userVerifyRepository.delete(id);
      if (expiredAt > now) {
        return {
          token,
          email,
          id,
        };
      }
    }
    const newVerificationToken = await makeHash(`${email}|${uuidv4()}`);
    const { token, id } = await this.userVerifyRepository.createOne(email, newVerificationToken);

    return { token, email, id };
  }

  /**
   * @returns 이메일 사용자가 이메일을 검증하였는 지 여부를 반환합니다.
   */
  public async lastCheckingEmailVerify(email: string) {
    const alreadyUser = await this.userRepository.findUserByEmail(email);
    if (alreadyUser) throw new BadRequestException('이미 가입된 이메일입니다.');
    const verificationInstance = await this.userVerifyRepository.findOne({
      email,
    });

    if (!verificationInstance) {
      return false;
    }

    return verificationInstance;
  }

  /**
   * @return 이메일 형식에 대한 검증 값을 UserVerify Entity 정보로 반환한다.
   */
  async verifyEmail(id: string, token: string) {
    const record = (await this.userVerifyRepository.findOne(id)) as UserVerifyEntity;
    if (!record) {
      throw new HttpException('인증 url 이 잘못되었습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (record.isVerified) return record;
    if (record.expiredAt < new Date()) return false;

    const isEqual = token === record.token;
    if (isEqual) record.isVerified = true;
    if (!isEqual) record.isVerified = false;

    await record.save();
    return record;
  }

  /**
   * @return 사용자 정보를 입력받아 다양한 예외를 처리하고, 생성정보를 반환합니다.
   */
  async join({ username, password, email, skills, job }: CreateUserDto) {
    const verification = await this.userVerifyRepository.findOne({
      email,
    });
    if (!verification || !verification.isVerified) {
      throw new HttpException('이메일 인증을 수행해주세요.', HttpStatus.BAD_REQUEST);
    }

    const currentUser = await this.userRepository.findUserByEmail(email);
    if (currentUser) {
      throw new HttpException('이미 존재하는 유저입니다.', HttpStatus.UNAUTHORIZED);
    }

    const currentName = await this.userRepository.findUserByName(username);
    if (currentName) {
      throw new HttpException('이미 존재하는 닉네임입니다.', HttpStatus.BAD_REQUEST);
    }
    const jobEntity = await this.userJobRepository.fineOneById(job);

    if (jobEntity === undefined) {
      throw new HttpException('직업 정보가 일치하지 않습니다.', HttpStatus.BAD_REQUEST);
    }

    const { id } = await this.userRepository.createUserOne({
      username,
      password: await makeHash(password),
      email,
      skills,
      job: jobEntity ? jobEntity.id : null,
    } as CreateUserDto);

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
    };
  }

  /**
   * @desc RefreshToken 을 사용자 정보에 저장합니다.
   */
  async saveHashRefreshToken(refreshToken: string, email: string) {
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
  async getUserIfTokenMatches(refreshToken: string, id: number) {
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
  getAccessTokenExpirationTime() {
    const accessTokenExpirationTime = this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    ) as string;
    const minutes = millisecondsToMinutes(Number(`${accessTokenExpirationTime}000`));
    return addMinutes(new Date(), minutes);
  }
}

export default AuthService;
