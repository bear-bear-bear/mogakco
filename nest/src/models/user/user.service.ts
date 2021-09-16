import { Injectable } from '@nestjs/common';
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
  async findAllFields(): Promise<UserFieldEntity[] | null> {
    const fields = await this.fieldRepository.find({ select: ['id', 'name'] });
    return fields;
  }

  /**
   * @return 직업정보 리스트를 반환합니다.
   */
  async findAllJobs(): Promise<UserJobEntity[]> {
    const jobList = await this.jobRepository.find({ select: ['id', 'name'] });
    return jobList;
  }
}

export default UserService;
