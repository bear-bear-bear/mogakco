import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import makeHash from '@lib/makeHash';
import UserVerifyEntity from '@models/entities/user-verify.entity';
import UserRepository from '../models/repositories/user.repository';
import UserVerifyRepository from '../models/repositories/user.verify.repository';
import createUserDTO from '../models/dto/create-user.dto';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserRepository)
    @InjectRepository(UserVerifyRepository)
    private userRepository: UserRepository,
    private userVerifyRepository: UserVerifyRepository,
  ) {}

  /**
   *
   * @param user 사용자 생성 DTO
   * @returns 새로운 사용자
   * 사용자 생성 DTO를 받아서 새로운 사용자를 생성한다.
   * 그리고 검증 레포지토리를 통해 새롭게 생성된 유저에 대해 토큰을 받는다.
   * 토큰을 받아서 이메일을 보낸다.
   * 이메일 라이브러리를 뭘 쓸지, 구조를 어떻게 잡을지 생각 중입니다.
   */
  // public async createUserOne(user: createUserDTO) {
  //   const newUser = await this.userRepository.createUserOne(user);
  //   const {
  //     userVerify: { id, token, userId },
  //     verifyToken,
  //   } = await this.userVerifyRepository.createOne(newUser);
  //   console.log(id, token, verifyToken, userId);
  //   return newUser;
  // }

  async verifyTokenBeforeRegister(email: string) {
    const currentVerification = await this.userVerifyRepository.findOne({
      email,
    });

    return currentVerification?.isVerified;
  }

  /**
   *
   * @param email
   * 이메일을 입력받습니다.
   * 이메일을 통해 이미 레코드가 있는지 보고, 레코드의 만료 날짜가 지났는지 검증합니다.
   * 만료 날짜가 아직 지나지 않았다면 기존에 생성된 레코드를 그대로 리턴할 것입니다.
   * 그렇지 않다면 새로운 레코드를 만들어서 프론트에 제공합니다.
   */
  async getEmailVerifyToken(email: string) {
    const now = new Date();
    const currentVerification = await this.userVerifyRepository.findOne({
      email,
    });

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

    const newVerificationToken = await makeHash(`${email}|${uuid()}`);
    const { token, id } = await this.userVerifyRepository.createOne(email, newVerificationToken);

    return { token, email, id };
  }

  public async lastCheckingEmailVerify(email: string) {
    const verificationInstance = await this.userVerifyRepository.findOne({
      email,
    });

    if (!verificationInstance) {
      return false;
    }

    return verificationInstance;
  }

  /**
   *
   * @param _id 컨트롤러에서 ID 값을 받습니다.
   * @param email 컨트롤러에서 이메일 값을 받습니다.
   * @param token 컨트롤러에서 토큰 값을 받습니다.
   * @returns boolean
   * id, 이메일 토큰 값으로 해당 테이블에 일치하는 레코드가 있는지 확인합니다.
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

  async findUserOne(id: number) {
    return this.userRepository.findUserOne(id);
  }

  async findUserByName(username: string) {
    return this.userRepository.findUserByName(username);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  async updateUserOne(user: any) {
    return this.userRepository.updateUser(user);
  }

  async deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }

  async join({ username, password, email }: createUserDTO) {
    const currentUser = await this.userRepository.findUserByEmail(email);
    if (currentUser) {
      throw new HttpException('이미 존재하는 유저입니다.', HttpStatus.UNAUTHORIZED);
    }
    const hashedPassword = await makeHash(password);
    await this.userRepository.createUserOne({
      username,
      password: hashedPassword,
      email,
    } as createUserDTO);

    return { message: '유저가 생성되었습니다.', statusCode: 201 };
  }

  /**
   * @param("refreshToken")
   * hashRefreshToken makes refresh token be hashed in database.
   */
  async hashRefreshToken(refreshToken: string, email: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 12);
    const isSaved = await this.userRepository.update(
      { email },
      {
        hashedRefreshToken: hashedToken,
      },
    );
    return isSaved;
  }

  async getUserIfTokenMatches(refreshToken: string, email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user && user.hashedRefreshToken) {
      const isMatch = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  /**
   *
   * @param id number
   * @param verifyToken string
   * 아이디와 이메일로 받은 토큰과 토큰의 아이디를 받아서 토큰이 맞는지, 그리고 토큰이 만료되었는지 검증
   * 검증되면 토큰을 사용자 ID와 uuid로 나눠 사용자 아이디로부터 사용자를 허가시킨다.
   * 나누는 단위는 |
   * 그렇지 않을 경우 검증 토큰을 다시 생성 및 이메일 전송
   */
  async verifyUserWithToken(id: number, verifyToken: string) {
    const userVerify = await this.userVerifyRepository.findOne({ id });
    if (!userVerify) {
      throw new InternalServerErrorException();
    }
    const isMatch = await bcrypt.compare(verifyToken, userVerify.token);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    if (userVerify.expiredAt < new Date()) {
      throw new UnauthorizedException('The verify token was expired.');
    }
    const [userId] = verifyToken.split('|');
    const user = await this.findUserOne(parseInt(userId, 10));
    if (!user && typeof user === 'boolean') {
      // await this.userVerifyRepository.createOne(user);
      return false;
    }

    await user.save();
    return true;
  }
}

export default UserService;
