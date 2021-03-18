import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import User from '../entities/user';
import userDTO from '../dto/userDTO';

@Injectable()
@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async createUserOne(user: userDTO): Promise<User> {
    const newUser = new User();
    newUser.password = user.password;
    newUser.username = user.username;
    newUser.email = user.email;
    await this.save(newUser);
    return newUser;
  }

  public async findUserOne(id: number): Promise<User> {
    const findUser: User = (await this.findOne(id)) as User;
    return findUser;
  }

  public async deleteUser(id: number): Promise<void> {
    await this.softDelete(id);
  }
}

export default UserRepository;