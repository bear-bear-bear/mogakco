import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import User from '../entities/user';
import userDTO from '../dto/userDTO';
import updateUserRequest from '../../test/unit/Services/dto/updateUserRequest';

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

  public findUserOne(id: number) {
    return this.findOne(id);
  }

  public findUserByName(username: string) {
    return this.findOne({
      where: { username },
      select: ['id'],
    });
  }

  public updateUser(user: updateUserRequest): Promise<User> {
    return this.save(user);
  }

  public deleteUser(id: number) {
    return this.softDelete(id);
  }
}

export default UserRepository;
