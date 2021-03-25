import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import User from '../entities/users';
import createUserDTO from '../dto/create-user.dto';
import updateUserRequestDto from '../../test/unit/Services/dto/update-user-request.dto';

@Injectable()
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

  public findUserOne(id: number) {
    return this.findOne(id);
  }

  public findUserByName(username: string) {
    return this.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'email'],
    });
  }

  public findUserByEmail(email: string) {
    return this.findOne({
      where: { email },
    });
  }

  public updateUser(user: updateUserRequestDto): Promise<User> {
    return this.save(user);
  }

  public deleteUser(id: number) {
    return this.softDelete(id);
  }
}

export default UserRepository;
