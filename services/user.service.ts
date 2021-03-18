import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../models/repositories/user.repository';
import userDTO from '../models/dto/userDTO';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public createUserOne(user: userDTO) {
    const newUser = this.userRepository.createUserOne(user);
    return newUser;
  }

  public findUserOne(id: number) {
    return this.userRepository.findUserOne(id);
  }
}

export default UserService;
