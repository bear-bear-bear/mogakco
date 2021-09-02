import { Factory, Seeder } from 'typeorm-seeding';
import { getCustomRepository } from 'typeorm';
import makeHash from '../lib/makeHash';
import UserJobEntity from '../models/entities/users-job.entity';
import { jobDataLength } from '../factory/users-job.factory';
import { fieldDataLength } from '../factory/users-field.factory';
import UserFieldEntity from '../models/entities/user-field.entity';
import UserEntity from '../models/entities/user.entity';
import UserRepository from '../models/repositories/user.repository';
import { getRandomFieldList, getRandomJob } from '../lib/test-support';
import RoomRepository from '../models/repositories/room.repository';

export default class CreateUserProps implements Seeder {
  async run(factory: Factory) {
    await factory(UserJobEntity)().createMany(jobDataLength);
    await factory(UserFieldEntity)().createMany(fieldDataLength);
    await getCustomRepository(UserRepository).createUserOne({
      username: 'mogauser',
      password: await makeHash('mogapass'),
      email: process.env.EMAIL_ADMIN as string,
      skills: await getRandomFieldList(),
      job: await getRandomJob(),
    });
    await factory(UserEntity)()
      .map(async ({ username, email, password: plain }: UserEntity): Promise<UserEntity> => {
        const password = await makeHash(plain);
        const returnUser = new UserEntity();
        returnUser.username = username;
        returnUser.password = password;
        returnUser.email = email;
        returnUser.skills = await getRandomFieldList();
        returnUser.job = await getRandomJob();
        return returnUser;
      })
      .createMany(30);

    await getCustomRepository(RoomRepository).createRoom(1);
  }
}
