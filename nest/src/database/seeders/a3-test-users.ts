import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { getRandomFieldList, getRandomJob } from '@common/helpers/test.helper';
import UserEntity from '@models/user/entities/user.entity';
import makeHashHelper from '@common/helpers/make-hash.helper';
import { ServerEnviroment } from '@common/helpers/enum.helper';
import UserRolesRepository from '@models/user/repositories/user-roles.repository';
import RolesRepository from '@models/user/repositories/roles.repository';
import UserRepository from '@models/user/repositories/user.repository';

/**
 * @desc mogauser, mogauser2 에게 일반 사용자 권한을 부여합니다.
 */
async function setTestUserRoles(connection: Connection) {
  const role = await connection.getCustomRepository(RolesRepository).findOne({
    where: {
      name: '일반 사용자',
    },
  });

  const mogauser = await connection.getCustomRepository(UserRepository).findOne({
    where: { username: 'mogauser' },
  });
  await connection
    .getCustomRepository(UserRolesRepository)
    .create({
      user: mogauser,
      role,
    })
    .save();
  const mogauser2 = await connection.getCustomRepository(UserRepository).findOne({
    where: { username: 'mogauser2' },
  });
  await connection
    .getCustomRepository(UserRolesRepository)
    .create({
      user: mogauser2,
      role,
    })
    .save();
}

export default class TestUserSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    if (process.env.NODE_ENV === ServerEnviroment.DEV) {
      const email = process.env.EMAIL_ADMIN as string;
      const skills = await getRandomFieldList();
      const job = await getRandomJob();
      const password = await makeHashHelper('mogapass');
      await connection
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values([
          {
            username: 'mogauser',
            password,
            email,
            skills,
            job,
          },
          {
            username: 'mogauser2',
            password,
            email: `${email}a`,
            skills,
            job,
          },
        ])
        .execute();

      await setTestUserRoles(connection);
    }
  }
}
