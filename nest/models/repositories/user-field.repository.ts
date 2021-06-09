import { EntityRepository, Repository } from 'typeorm';
import UserFieldEntity from '@models/entities/user-field.entity';

@EntityRepository(UserFieldEntity)
export default class UserFieldRepository extends Repository<UserFieldEntity> {}
