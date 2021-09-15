import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserFieldEntity from '@models/user/entities/user-field.entity';
import UserJobEntity from '@models/user/entities/users-job.entity';
import UserFieldRepository from '@models/user/repositories/user-field.repository';
import UserJobRepository from '@models/user/repositories/ user-job.reposity';
import UserRepository from '@models/user/repositories/user.repository';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private fieldRepository: UserFieldRepository,
    private jobRepository: UserJobRepository,
  ) {}

  deleteUser(id: number) {
    return this.userRepository.softDelete(id);
  }

  findUserForLogin(id: number) {
    return this.userRepository.findUserByIdForLogin(id);
  }

  findUserShallow(id: number) {
    return this.userRepository.findUserShallow(id);
  }

  /**
   * @return 분야정보 리스트를 반환합니다.
   */
  async findAllFields(userId: number): Promise<UserFieldEntity[] | null> {
    try {
      const user = await this.userRepository.findOne({ id: userId });
      if (!user) throw new InternalServerErrorException('유저 정보를 불러올 수 없습니다.');
      const fields = await this.userRepository.getUserFields(user.skills);
      return fields;
    } catch (err) {
      throw new InternalServerErrorException(`필드 정보를 불러올 수 없습니다.`);
    }
  }

  /**
   * @return 직업정보 리스트를 반환합니다.
   */
  async findAllJobs(): Promise<UserJobEntity[]> {
    try {
      const jobList = await this.jobRepository.find();
      return jobList;
    } catch (err) {
      throw new InternalServerErrorException(`직업 정보를 불러올 수 없습니다.`);
    }
  }
}

export default UserService;
