import { EntityRepository, Repository } from 'typeorm';
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
    return this.findOne(id);
  }

  public async findUserByName(username: string) {
    return this.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'email'],
    });
  }

  public async findUserByEmail(email: string) {
    const user = await this.findOne({
      where: { email },
    });
    return user;
  }

  public async updateUser(user: updateUserRequestDto): Promise<User> {
    return this.save(user);
  }

  public async deleteUser(id: number) {
    return this.softDelete(id);
  }
}

export default UserRepository;
