import { Injectable, NotFoundException } from '@nestjs/common';
import UserFieldEntity from '@models/user/entities/user-field.entity';
import UserJobEntity from '@models/user/entities/users-job.entity';
import UserFieldRepository from '@models/user/repositories/user-field.repository';
import UserJobRepository from '@models/user/repositories/ user-job.reposity';
import UserRepository from '@models/user/repositories/user.repository';
import UpdateUserDto from '@authentication/dto/update-user.dto';
import { ShallowUser } from '@models/user/interface/service';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly fieldRepository: UserFieldRepository,
    private readonly jobRepository: UserJobRepository,
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

  /**
   * @desc 사용자 정보를 수정합니다.
   */
  async changeUserInfo(id: number, updateUserDto: UpdateUserDto): Promise<ShallowUser | undefined> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new NotFoundException('유저가 존재하지 않습니다.');
    await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
    return this.userRepository.findUserShallow(user.id);
  }
}
