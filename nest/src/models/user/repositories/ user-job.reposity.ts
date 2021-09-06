import { EntityRepository, Repository } from 'typeorm';
import UserJobEntity from '../entities/users-job.entity';

@EntityRepository(UserJobEntity)
export default class UserJobRepository extends Repository<UserJobEntity> {
  async fineOneById(id: UserJobEntity | null) {
    if (id === null) {
      return null;
    }
    const job = await this.findOne(id);
    if (!job) return null;
    return job;
  }
}
