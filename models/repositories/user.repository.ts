import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import User from '../entities/user';
import userDTO from '../dto/userDTO';

@Injectable()
@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async createUserOne(user: userDTO) {
    const newUser = new User();
    newUser.password = user.password;
    newUser.username = user.username;
    newUser.email = user.email;
    await this.save(newUser);
    return newUser;
  }
}

export default UserRepository;
