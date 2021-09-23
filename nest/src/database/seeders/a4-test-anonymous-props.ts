import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import UserRepository from '@models/user/repositories/user.repository';
import { ServerEnviroment } from '@common/helpers/enum.helper';
import AnonymousPrefixEntity from '@models/chat/entities/anonymous_prefix.entity';
import AnonymousNameEntity from '@models/chat/entities/anonymous_names.entity';

export default class TestAnonymousPropSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    if (process.env.NODE_ENV === ServerEnviroment.DEV) {
      const testAdmin = await connection.getCustomRepository(UserRepository).findOne({
        where: { username: 'admin' },
      });
      await connection
        .createQueryBuilder()
        .insert()
        .into(AnonymousPrefixEntity)
        .values([
          {
            name: '안경을 똑바로 쓴',
            user: testAdmin,
          },
          {
            name: '안경을 거꾸로 쓴',
            user: testAdmin,
          },
        ])
        .execute();

      await connection
        .createQueryBuilder()
        .insert()
        .into(AnonymousNameEntity)
        .values([
          {
            name: '프로브',
            user: testAdmin,
          },
          {
            name: '김첨지',
            user: testAdmin,
          },
        ])
        .execute();
    }
  }
}
