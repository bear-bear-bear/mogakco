import { Factory, Seeder } from 'typeorm-seeding';
import UserJobEntity from '@models/user/entities/users-job.entity';
import { jobDataLength } from '@src/database/factories/users-job.factory';
import UserFieldEntity from '@models/user/entities/user-field.entity';
import { fieldDataLength } from '@src/database/factories/users-field.factory';

export default class JobsAndFieldsSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    await factory(UserJobEntity)().createMany(jobDataLength);
    await factory(UserFieldEntity)().createMany(fieldDataLength);
  }
}
