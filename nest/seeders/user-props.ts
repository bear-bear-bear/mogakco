import { Factory, Seeder } from 'typeorm-seeding';
import UserJobEntity from '../models/entities/users-job.entity';
import jobDataLength from '../factory/users-job.factory';
import fieldDataLength from '../factory/users-field.factory';
import UserFieldEntity from '../models/entities/user-field.entity';

export default class CreateUserJobs implements Seeder {
  async run(factory: Factory) {
    await factory(UserJobEntity)().createMany(jobDataLength);
    await factory(UserFieldEntity)().createMany(fieldDataLength);
  }
}
