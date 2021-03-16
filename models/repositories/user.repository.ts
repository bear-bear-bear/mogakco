import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import User from '../entities/user';

@Injectable()
@EntityRepository(User)
class UserRepository extends Repository<User> {}

export default UserRepository;
