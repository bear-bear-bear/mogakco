import { Factory, Seeder } from 'typeorm-seeding';
import { getCustomRepository } from 'typeorm';
import makeHash from '../lib/makeHash';
import UserJobEntity from '../models/entities/users-job.entity';
import { jobDataLength } from '../factory/users-job.factory';
import { fieldDataLength } from '../factory/users-field.factory';
import UserFieldEntity from '../models/entities/user-field.entity';
import UserEntity from '../models/entities/user.entity';
import UserRepository from '../models/repositories/user.repository';

export default class CreateUserJobs implements Seeder {
  async run(factory: Factory) {
    await factory(UserJobEntity)().createMany(jobDataLength);
    await factory(UserFieldEntity)().createMany(fieldDataLength);
    await getCustomRepository(UserRepository).createUserOne({
      username: 'mogauser',
      password: await makeHash('mogapass'),
      email: process.env.EMAIL_ADMIN as string,
      skills: [1, 2, 3],
      job: 1,
    });
    await factory(UserEntity)()
      .map(async ({ username, email, password: plain }: UserEntity): Promise<UserEntity> => {
        const password = await makeHash(plain);
        const jobList = await UserJobEntity.find();
        const fieldList = await UserFieldEntity.find();
        const fieldIndexArray = fieldList.map(({ id }) => id);
        const rand = Math.floor(Math.random() * jobList.length);
        const returnUser = new UserEntity();
        returnUser.username = username;
        returnUser.password = password;
        returnUser.email = email;
        returnUser.skills = [
          // TODO: 코드 보완 예정
          fieldIndexArray[1],
          fieldIndexArray[3],
          fieldIndexArray[4],
        ];
        returnUser.job = jobList[rand];
        return returnUser;
      })
      .createMany(30);
  }
}
