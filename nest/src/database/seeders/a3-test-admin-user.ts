import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { ServerEnviroment } from '@common/helpers/enum.helper';
import { getRandomFieldList, getRandomJob } from '@common/helpers/test.helper';
import makeHashHelper from '@common/helpers/make-hash.helper';
import UserRepository from '@models/user/repositories/user.repository';
import RolesRepository from '@models/user/repositories/roles.repository';

/**
 * @desc 어드민 계정을 생성합니다.
 */
export default class TestAdminUserSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    if (process.env.NODE_ENV === ServerEnviroment.DEV) {
      const user = await connection
        .getCustomRepository(UserRepository)
        .create({
          username: 'admin',
          password: await makeHashHelper('admin'),
          email: 'admin@admin.com',
          skills: await getRandomFieldList(),
          job: await getRandomJob(),
        })
        .save();

      const role = await connection.getCustomRepository(RolesRepository).findOne({
        where: { name: '관리자' },
      });

      await connection.query(
        `
        INSERT
        INTO user_roles (user_id, role_id)
        VALUES (?, ?);
      `,
        [user.id, role?.id],
      );
    }
  }
}
