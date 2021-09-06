import { EntityRepository, Repository } from 'typeorm';
import UserJobEntity from '../entities/users-job.entity';

@EntityRepository(UserJobEntity)
export default class UserJobRepository extends Repository<UserJobEntity> {
  async fineOneById(id: UserJobEntity | null) {
    if (id === null) {
      return null;
    }
    const jobEntity = await this.findOne(id);

    return jobEntity;
  }
}
