import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserFieldEntity from '@models/entities/user-field.entity';
import UserJobEntity from '@models/entities/users-job.entity';
import UserFieldRepository from '@models/repositories/user-field.repository';
import UserJobRepository from '@models/repositories/ user-job.reposity';
import UserRepository from '../models/repositories/user.repository';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private fieldRepository: UserFieldRepository,
    private jobRepository: UserJobRepository,
  ) {}

  async findUserOne(id: number) {
    return this.userRepository.findUserOne(id);
  }

  findUserByName(username: string) {
    return this.userRepository.findUserByName(username);
  }

  findUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  updateUserOne(user: any) {
    return this.userRepository.updateUser(user);
  }

  deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }

  findUserForLogin(id: number) {
    return this.userRepository.findUserByIdForLogin(id);
  }

  /**
   * @return 분야정보 리스트를 반환합니다.
   */
  async findAllFields(): Promise<UserFieldEntity[]> {
    try {
      const fieldList = await this.fieldRepository.find();
      return fieldList;
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
