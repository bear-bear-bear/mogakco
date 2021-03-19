import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../models/repositories/user.repository';
import userDTO from '../models/dto/userDTO';
import updateUserRequest from '../test/unit/Services/dto/updateUserRequest';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public createUserOne(user: userDTO) {
    return this.userRepository.createUserOne(user);
  }

  public findUserOne(id: number) {
    return this.userRepository.findUserOne(id);
  }

  public updateUserOne(user: updateUserRequest) {
    return this.userRepository.updateUser(user);
  }

  public deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }
}

export default UserService;
