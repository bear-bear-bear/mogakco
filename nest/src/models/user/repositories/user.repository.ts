import { EntityRepository, getManager, Repository } from 'typeorm';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import CreateUserDto from '@authentication/dto/create-user.dto';
import UserFieldEntity from '../entities/user-field.entity';
import UserEntity from '../entities/user.entity';
import { FindShallowUserRepository, ShallowUser } from '@models/user/interface/service';

type UserEntityType = UserEntity | undefined;

@EntityRepository(UserEntity)
export default class UserRepository extends Repository<UserEntity> {
  /**
   * @desc 유저 생성
   */
  async createUserOne({
    username,
    password,
    email,
    job,
    skills,
  }: CreateUserDto): Promise<UserEntity> {
    const newUser = this.create({
      username,
      password,
      email,
      job,
      skills,
    });
    await this.save(newUser);
    return newUser;
  }

  /**
   * @desc id 에 해당하는 유저를 찾는다.
   */
  findUserOne(id: number): Promise<UserEntityType> {
    return this.findOne({ id });
  }

  /**
   * @desc username 에 해당하는 유저를 찾는다.
   */
  findUserByName(username: string): Promise<UserEntityType> {
    return this.findOne({
      where: { username },
      select: ['username'],
    });
  }

  /**
   * @desc email 에 해당하는 유저를 찾는다.
   */
  findUserByEmail(email: string): Promise<UserEntityType> {
    return this.findOne({ email });
  }

  /**
   * @desc 클라이언트, 사용자에게 제공되어야 할 객체만을 전달합니다.
   * @return 로그인 성공 시 전달 될 유저 객체를 만들어 반환한다.
   */
  async findUserByEmailForLogin(email: string) {
    const user = await this.getJoinJobQueryBuilder()
      .where('user.email = :email', { email })
      .getOne();
    if (!user) return null;
    delete user.job?.createdAt;
    delete user.job?.updatedAt;
    const skills = await this.getUserFields(user.skills);
    return {
      ...user,
      skills,
    };
  }

  async findUserByIdForLogin(id: number) {
    const user = await this.getJoinJobQueryBuilder().where('user.id = :id', { id }).getOne();
    if (user === undefined) return null;
    const skills = await this.getUserFields(user.skills);
    delete user.job?.createdAt;
    delete user.job?.updatedAt;
    return {
      ...user,
      skills,
    };
  }

  /**
   * @desc 기존 유저 불러오기에서 민감한 데이터를 제거합니다.
   */
  async findUserShallow(id: number): Promise<ShallowUser | undefined> {
    const user = (await this.findOne(
      { id },
      {
        select: ['id', 'username', 'email', 'skills', 'job'],
        relations: ['job'],
      },
    )) as FindShallowUserRepository | undefined;
    if (user === undefined) throw new NotFoundException('유저가 존재하지 않습니다.');
    const skills = await this.getUserFields(user.skills);
    return {
      ...user,
      skills,
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

  /**
   * @desc skill id 리스트를 받아서 객체를 반환합니다.
   * @return [{ id, name }, ...]
   */
  getUserFields(list: number[] | null): Promise<UserFieldEntity[]> | null {
    if (!list) return null;
    return getManager().findByIds(UserFieldEntity, list, {
      select: ['id', 'name'],
    });
  }

  /**
   * @desc 사용자 id를 받아서 해당하는 직업 정보 객체를 반환합니다.
   * @return { id, name }
   */
  getUserJob(id: number) {
    return getManager().findOne(UserFieldEntity, {
      select: ['id', 'name'],
      where: {
        id,
      },
    });
  }

  /**
   * @desc users_job 과 join 이 연결된 쿼리 빌더를 반환합니다.
   */
  getJoinJobQueryBuilder() {
    return this.createQueryBuilder('user').leftJoinAndSelect('user.job', 'user_job');
  }
}
