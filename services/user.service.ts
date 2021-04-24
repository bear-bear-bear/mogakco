import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import User from 'models/entities/user';
import { v4 as uuid } from 'uuid';
import UserRepository from '../models/repositories/user.repository';
import UserVerifyRepository from '../models/repositories/user.verify.repository';
import createUserDTO from '../models/dto/create-user.dto';
import updateUserRequestDto from '../test/unit/Services/dto/update-user-request.dto';
import makeHash from '../lib/backend/makeHash';

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

  /**
   *
   * @param email
   * 이메일을 입력받습니다.
   * 이메일을 통해 이미 레코드가 있는지 보고, 레코드의 만료 날짜가 지났는지 검증합니다.
   * 만료 날짜가 아직 지나지 않았다면 기존에 생성된 레코드를 그대로 리턴할 것입니다.
   * 그렇지 않다면 새로운 레코드를 만들어서 프론트에 제공합니다.
   */
  public async prepareJoin(userEmail: string) {
    const currentUserVerify = await this.userVerifyRepository.findOne({
      email: userEmail,
    });
    if (currentUserVerify && currentUserVerify.expiredAt > new Date()) {
      return [currentUserVerify.token, userEmail];
    }

    const verifyToken = await makeHash(`${userEmail}|${uuid()}`);
    const newVerify = await this.userVerifyRepository.createOne(
      userEmail,
      verifyToken,
    );

    return [newVerify.token, userEmail];
  }

  /**
   *
   * @param _id 컨트롤러에서 ID 값을 받습니다.
   * @param email 컨트롤러에서 이메일 값을 받습니다.
   * @param token 컨트롤러에서 토큰 값을 받습니다.
   * @returns boolean
   * id, 이메일 토큰 값으로 해당 테이블에 일치하는 레코드가 있는지 확인합니다.
   */
  public async verifyEmail(_id: string, email: string, token: string) {
    const id = parseInt(_id, 10);
    if (!id) throw new NotFoundException();
    const record = await this.userVerifyRepository.findOneByEmail(id, email);
    const isEqual = await bcrypt.compare(token, record.token);
    return isEqual;
  }

  public async findUserOne(id: number) {
    return this.userRepository.findUserOne(id);
  }

  public async findUserByName(username: string) {
    return this.userRepository.findUserByName(username);
  }

  public async findUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  public async updateUserOne(user: updateUserRequestDto) {
    return this.userRepository.updateUser(user);
  }

  public async deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }

  public async join({ username, password, email }: createUserDTO) {
    const currentUser = await this.userRepository.findUserByEmail(email);
    if (currentUser) {
      throw new HttpException(
        '이미 존재하는 유저입니다.',
        HttpStatus.UNAUTHORIZED,
      );
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
  public async hashRefreshToken(refreshToken: string, email: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 12);
    const isSaved = await this.userRepository.update(
      { email },
      {
        hashedRefreshToken: hashedToken,
      },
    );
    return isSaved;
  }

  public async getUserIfTokenMatches(refreshToken: string, email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user && user.hashedRefreshToken) {
      const isMatch = await bcrypt.compare(
        refreshToken,
        user.hashedRefreshToken,
      );
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
  public async verifyUserWithToken(id: number, verifyToken: string) {
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
    user.verifiedAt = new Date();
    await user.save();
    return true;
  }

  public async resendEmail(user: User) {
    // const {
    //   userVerify,
    //   verifyToken,
    // } = await this.userVerifyRepository.createOne(user);
    // console.log(userVerify, verifyToken);
    console.log('test');
  }
}

export default UserService;
