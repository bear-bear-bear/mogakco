import RolesEntity from '@models/user/entities/roles.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RolesEntity)
export default class RolesRepository extends Repository<RolesEntity> {}
