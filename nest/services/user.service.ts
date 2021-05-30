import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../models/repositories/user.repository';
import UserVerifyRepository from '../models/repositories/user.verify.repository';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserRepository)
    @InjectRepository(UserVerifyRepository)
    private userRepository: UserRepository,
  ) {}

  async findUserOne(id: number) {
    return this.userRepository.findUserOne(id);
  }

  async findUserByName(username: string) {
    return this.userRepository.findUserByName(username);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  async updateUserOne(user: any) {
    return this.userRepository.updateUser(user);
  }

  async deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }
}

export default UserService;
