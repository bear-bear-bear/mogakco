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

  public getUserOne(id: number) {
    const user = this.userRepository.findOne(id);
    return user;
  }
}

export default UserService;
