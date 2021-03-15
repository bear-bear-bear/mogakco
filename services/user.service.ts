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

  public createUser(user: userDTO) {
    return this.userRepository.create(user);
  }

  public async getUserOne(id: number) {
    const user = await this.userRepository.findOne(id);
    return user;
  }
}

export default UserService;
