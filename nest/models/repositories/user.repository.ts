import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '@typing/auth';
import UserFieldEntity from '../entities/user-field.entity';
import UserEntity from '../entities/user.entity';
import UserJobEntity from '../entities/users-job.entity';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
  async createUserOne({
    username,
    password,
    email,
    job,
    skills,
  }: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    newUser.job = job;
    newUser.skills = skills;

    await this.save(newUser);
    return newUser;
  }

  async findUserOne(id: number) {
    const user = await this.findOne({ id });
    if (!user) {
      throw new InternalServerErrorException();
    }
    return user;
  }

  async findUserByName(username: string) {
    const user = await this.findOne({
      where: { username },
      select: ['username'],
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.findOne({ email });
    if (!user) {
      return null;
    }
    return user;
  }

  /**
   * @return 로그인 성공 시 전달 될 유저 객체를 만들어 반환한다.
   * @desc 클라이언트, 사용자에게 제공되어야 할 객체만을 전달합니다.
   */
  async findUserByEmailForLogin(email: string) {
    const user = await this.findOne(
      { email },
      {
        select: ['id', 'username', 'email', 'password', 'skills', 'job'],
      },
    );

    if (user === undefined) return null;

    // TODO: Relation Column 개선 필요
    const skillIds = user.skills;
    const skills =
      skillIds &&
      (await UserFieldEntity.findByIds(skillIds, {
        select: ['id', 'name'],
      }));
    const job = await UserJobEntity.findOne({
      select: ['id', 'name'],
      where: { id: user.id },
    });
    return {
      ...user,
      skills,
      job,
    };
  }

  async findUserByIdForLogin(id: number) {
    const user = await this.findOne(id, {
      select: ['id', 'username', 'email', 'password', 'skills', 'job'],
    });

    if (user === undefined) return null;

    // TODO: Relation Column 개선 필요
    const skillIds = user.skills;
    const skills =
      skillIds &&
      (await UserFieldEntity.findByIds(skillIds, {
        select: ['id', 'name'],
      }));
    const job = await UserJobEntity.findOne({
      select: ['id', 'name'],
      where: { id: user.id },
    });
    return {
      ...user,
      skills,
      job,
    };
  }

  /**
   * @description 민감한 데이터 제거, 중복 함수가 많기때문에 차선책을 고려할 예정 TODO: 차선책 요구
   */
  async findUserShallow(id: number) {
    const user = await this.findOne(id, {
      select: ['id', 'username', 'email', 'skills', 'job'],
    });

    if (user === undefined) return null;

    // TODO: Relation Column 개선 필요
    const skillIds = user.skills;
    const skills =
      skillIds &&
      (await UserFieldEntity.findByIds(skillIds, {
        select: ['id', 'name'],
      }));
    const job = await UserJobEntity.findOne({
      select: ['id', 'name'],
      where: { id: user.id },
    });
    return {
      ...user,
      skills,
      job,
    };
  }

  async updateUser(user: any): Promise<UserEntity> {
    const updatedUser = await this.save(user);
    if (!updatedUser) {
      throw new InternalServerErrorException();
    }
    return updatedUser;
  }

  async deleteUser(id: number) {
    return this.softDelete(id);
  }
}

export default UserRepository;
