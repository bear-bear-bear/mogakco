import { Factory, Seeder } from 'typeorm-seeding';
import { getCustomRepository } from 'typeorm';
import UserJobEntity from '@models/user/entities/users-job.entity';
import UserFieldEntity from '@models/user/entities/user-field.entity';
import UserEntity from '@models/user/entities/user.entity';
import UserRepository from '@models/user/repositories/user.repository';
import RoomRepository from '@models/chat/repositories/room.repository';
import makeHash from '@lib/makeHash';
import { getRandomFieldList, getRandomJob } from '@common/helpers/test.helper';
import { jobDataLength } from '../factories/users-job.factory';
import { fieldDataLength } from '../factories/users-field.factory';

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
