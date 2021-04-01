import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm/browser';
import UserVerifies from '../entities/user_verifies';

@Injectable()
@EntityRepository(UserVerifies)
class UserVerifyRepository extends Repository<UserVerifies> {}

export default UserVerifyRepository;
