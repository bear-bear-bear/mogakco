import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import User from '../entities/user';
import createUserDTO from '../dto/create-user.dto';
import updateUserRequestDto from '../../test/unit/Services/dto/update-user-request.dto';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async createUserOne(user: createUserDTO): Promise<User> {
    const newUser = new User();
    newUser.password = user.password;
    newUser.username = user.username;
    newUser.email = user.email;
    await this.save(newUser);
    return newUser;
  }

  public async findUserOne(id: number) {
    const user = await this.findOne({ id });
    if (!user) {
      throw new InternalServerErrorException();
    }
    return user;
  }

  public async findUserByName(username: string) {
    const user = await this.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'email'],
    });
    if (!user) {
      throw new InternalServerErrorException();
    }
    return user;
  }

  public async findUserByEmail(email: string) {
    const user = await this.findOne({ email });
    if (!user) {
      return null;
    }
    return user;
  }

  public async updateUser(user: updateUserRequestDto): Promise<User> {
    const updatedUser = await this.save(user);
    if (!updatedUser) {
      throw new InternalServerErrorException();
    }
    return updatedUser;
  }

  public async deleteUser(id: number) {
    return this.softDelete(id);
  }
}

export default UserRepository;
