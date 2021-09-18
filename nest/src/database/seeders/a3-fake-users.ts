import { Factory, Seeder } from 'typeorm-seeding';
import UserEntity from '@models/user/entities/user.entity';
import makeHash from '@common/helpers/make-hash.helper';
import { getRandomFieldList, getRandomJob } from '@common/helpers/test.helper';
import { Connection } from 'typeorm';
import UserRolesRepository from '@src/models/user/repositories/user-roles.repository';
import RolesRepository from '@models/user/repositories/roles.repository';
import { ServerEnviroment } from '@common/helpers/enum.helper';

export default class FakeUserSeed implements Seeder {
  async run(factory: Factory, connection: Connection) {
    if (process.env.NODE_ENV === ServerEnviroment.DEV) {
      const users = await factory(UserEntity)()
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

      const role = await connection.getCustomRepository(RolesRepository).findOne({
        where: { name: '일반 사용자' },
      });

      const createRolePromises = users.map(
        user =>
          new Promise((resolve, reject) => {
            const userRole = connection.getCustomRepository(UserRolesRepository).create({
              user,
              role,
            });
            if (!userRole) reject(new Error('역할이 없음'));
            resolve(userRole.save());
          }),
      );

      await Promise.all(createRolePromises);
    }
  }
}
