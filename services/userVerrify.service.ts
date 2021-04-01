import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserVerifyRepository from '../models/repositories/userVerify.repository';

@Injectable()
class UserVerrifyService {
  constructor(
    @InjectRepository(UserVerifyRepository)
    private userVerifyRepository: UserVerifyRepository,
  ) {}
}

export default UserVerrifyService;
