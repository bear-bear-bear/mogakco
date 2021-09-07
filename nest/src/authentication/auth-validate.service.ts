import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import UserRepository from '@models/user/repositories/user.repository';
import makeHash from '@common/helpers/make-hash.helper';
import { v4 as uuidv4 } from 'uuid';
import UserVerifyRepository from '@models/user/repositories/user-verify.repository';
import UserVerifyEntity from '@models/user/entities/user-verify.entity';
import UserJobEntity from '@models/user/entities/users-job.entity';
import UserJobRepository from '@models/user/repositories/ user-job.reposity';
import CreateUserDto from '@authentication/dto/create-user.dto';

@Injectable()
export default class AuthValidateService {
  constructor(
    private userRepository: UserRepository,
    private userVerifyRepository: UserVerifyRepository,
    private userJobRepository: UserJobRepository,
  ) {}

  /**
   * @return 로그인 성공 시 패스워드가 제외된 유저 정보 객체를 넘긴다.
   */
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUserByEmailForLogin(email);
    if (user === null) throw new NotFoundException('가입되지 않은 유저입니다.');
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }
    const { password: pw, hashedRefreshToken, ...returnProps } = user;
    return returnProps;
  }

  /**
   * @return 이메일 형태를 검증합니다.
   */
  verifyEmailRequest(email: string | undefined): void {
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
  async getEmailVerifyToken(email: string): Promise<{ token: string; email: string; id: number }> {
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
   * @desc 회원가입에 대해 user_verify 를 검증합니다.
   */
  async validateJoinVerification(email: string): Promise<void> {
    const credentials = await this.userVerifyRepository.findOne({
      email,
    });
    if (!credentials || !credentials.isVerified) {
      throw new HttpException('이메일 인증을 수행해주세요.', HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * @desc 회원가입에 대해 사용가능한 email 인 지 검사합니다.
   */
  async validateJoinEmail(email: string): Promise<void> {
    const currentUser = await this.userRepository.findUserByEmail(email);
    if (currentUser) {
      throw new HttpException('이미 존재하는 유저입니다.', HttpStatus.CONFLICT);
    }
  }

  /**
   * @desc 회원가입에 대해 사용가능한 유저 이름인 지 검사합니다.
   */
  async validateJoinName(name: string): Promise<void> {
    const currentName = await this.userRepository.findUserByName(name);
    if (currentName) {
      throw new HttpException('이미 존재하는 닉네임입니다.', HttpStatus.CONFLICT);
    }
  }

  /**
   * @desc 회원가입에 대해 올바른 직업 정보가 전달되었는 지 검사합니다.
   */
  async validateJoinJob(job: UserJobEntity | null): Promise<void> {
    if (job) {
      const jobEntity = await this.userJobRepository.fineOneById(job);

      if (jobEntity === undefined) {
        throw new HttpException('직업 정보가 일치하지 않습니다.', HttpStatus.BAD_REQUEST);
      }
    }
  }

  /**
   * @desc validateJoin 으로 시작하는 메서드를 모두 실행합니다.
   */
  async validateJoin(dto: CreateUserDto) {
    const { email, username, job } = dto;
    await this.validateJoinVerification(email);
    await this.validateJoinEmail(email);
    await this.validateJoinName(username);
    await this.validateJoinJob(job);
  }
}
