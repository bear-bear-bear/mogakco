import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import RolesEntity from '@models/user/entities/roles.entity';

export default class BasicRoleSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(RolesEntity)
      .values([
        {
          name: '일반 사용자',
        },
        {
          name: '관리자',
        },
      ])
      .execute();
  }
}
