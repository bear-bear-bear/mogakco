import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import UserRepository from '../models/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../models/repositories/user.repository';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private connection: Connection,
  ) {}

  async findUserOne(id: number) {
    return this.userRepository.findUserOne(id);
  }

  findUserByName(username: string) {
    return this.userRepository.findUserByName(username);
  }

  findUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  updateUserOne(user: any) {
    return this.userRepository.updateUser(user);
  }

  deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }

  async findAllFields() {
    const fieldList = await this.connection
      .getRepository(UserFieldEntity)
      .createQueryBuilder('users-field')
      .getMany();

    if (!fieldList) {
      throw new HttpException('필드 정보를 불러올 수 없습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return fieldList;
  }
}

export default UserService;
