import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { getRandomFieldList, getRandomJob } from '@common/helpers/test.helper';
import UserEntity from '@models/user/entities/user.entity';
import makeHashHelper from '@common/helpers/make-hash.helper';
import RolesEntity from '@models/user/entities/roles.entity';
import UserRolesEntity from '@src/models/user/entities/user-roles.entity';
import { ServerEnviroment } from '@common/helpers/enum.helper';

/**
 * @desc mogauser, mogauser2 에게 일반 사용자 권한을 부여합니다.
 */
async function setTestUserRoles(connection: Connection) {
  const role = await connection
    .createQueryBuilder()
    .select()
    .from(RolesEntity, 'roles')
    .where('roles.name = :name', { name: '일반 사용자' })
    .getOne();

  await connection
    .createQueryBuilder()
    .insert()
    .into(UserRolesEntity)
    .values({
      user: await connection
        .createQueryBuilder()
        .select()
        .from(UserEntity, 'user')
        .where('user.username = :username', { username: 'mogauser' })
        .getOne(),
      role,
    });

  await connection
    .createQueryBuilder()
    .insert()
    .into(UserRolesEntity)
    .values({
      user: await connection
        .createQueryBuilder()
        .select()
        .from(UserEntity, 'user')
        .where('user.username = :username', { username: 'mogauser2' })
        .getOne(),
      role,
    });
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
