import { Factory, Seeder } from 'typeorm-seeding';
import UserJobEntity from '../models/entities/users-job.entity';
import { jobDataLength } from '../factory/users-job.factory';
import { fieldDataLength } from '../factory/users-field.factory';
import UserFieldEntity from '../models/entities/user-field.entity';
import UserEntity from '../models/entities/user.entity';

export default class CreateUserJobs implements Seeder {
  async run(factory: Factory) {
    await factory(UserJobEntity)().createMany(jobDataLength);
    await factory(UserFieldEntity)().createMany(fieldDataLength);
    await factory(UserEntity)()
      .map(async (user: UserEntity): Promise<any> => {
        const jobList = await UserJobEntity.find();
        const rand = Math.floor(Math.random() * jobList.length);
        const returnUser = new UserEntity();
        return user;
      })
      .createMany(30);
  }
}
