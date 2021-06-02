import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import UserJobEntity from '@models/entities/users-job.entity';
import UserEntity from '../entities/user.entity';
import createUserDTO from '../dto/create-user.dto';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
  async createUserOne(user: createUserDTO): Promise<UserEntity> {
    const job = await UserJobEntity.findOne(user.job);
    const newUser = new UserEntity();
    newUser.password = user.password;
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.skills = user.skills;
    newUser.job = job;

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
      throw new InternalServerErrorException();
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
