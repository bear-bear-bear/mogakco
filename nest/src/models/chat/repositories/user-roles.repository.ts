import { EntityRepository, Repository } from 'typeorm';
import UserRolesEntity from '@models/chat/entities/user-roles.entity';

@EntityRepository(UserRolesEntity)
export default class UserRolesRepository extends Repository<UserRolesEntity> {}
