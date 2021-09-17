import { Factory, Seeder } from 'typeorm-seeding';
import { getCustomRepository, getManager } from 'typeorm';
import UserJobEntity from '@models/user/entities/users-job.entity';
import UserFieldEntity from '@models/user/entities/user-field.entity';
import UserEntity from '@models/user/entities/user.entity';
import UserRepository from '@models/user/repositories/user.repository';
import RoomRepository from '@models/chat/repositories/room.repository';
import makeHash from '@common/helpers/make-hash.helper';
import { getRandomFieldList, getRandomJob } from '@common/helpers/test.helper';
import { jobDataLength } from '../factories/users-job.factory';
import { fieldDataLength } from '../factories/users-field.factory';

export default class CreateUserProps implements Seeder {
  async run(factory: Factory) {
    await factory(UserJobEntity)().createMany(jobDataLength);
    await factory(UserFieldEntity)().createMany(fieldDataLength);
    const email = process.env.EMAIL_ADMIN as string;
    const skills = await getRandomFieldList();
    const job = await getRandomJob();
    await getCustomRepository(UserRepository).createUserOne({
      username: 'mogauser',
      password: await makeHash('mogapass'),
      email,
      skills,
      job,
    });
    await getCustomRepository(UserRepository).createUserOne({
      username: 'mogauser2',
      password: await makeHash('mogapass'),
      email: `${email}a`,
      skills,
      job,
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

    const owner = (await getManager().findOne(UserEntity, { id: 1 })) as UserEntity;
    await getCustomRepository(RoomRepository).createRoom(owner);
  }
}
