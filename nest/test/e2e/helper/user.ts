import { DeleteResult, getConnection, InsertResult } from 'typeorm';
import UserEntity from '@models/user/entities/user.entity';
import { getRandomFieldList, getRandomJob } from '@common/helpers/test.helper';
import { TestUtil } from '@test/e2e/helper/enum';
import makeHashHelper from '@common/helpers/make-hash.helper';

export const createTestUser = async (): Promise<InsertResult> =>
  getConnection()
    .createQueryBuilder()
    .insert()
    .into(UserEntity)
    .values({
      email: TestUtil.EMAIL,
      username: TestUtil.USERNAME,
      password: await makeHashHelper(TestUtil.PASSWORD),
      skills: await getRandomFieldList(),
      job: await getRandomJob(),
    })
    .execute();

export const findTestUser = async (): Promise<UserEntity | undefined> => {
  const result = await getConnection()
    .createQueryBuilder()
    .select()
    .from(UserEntity, 'user')
    .where('user.username = :username', { username: TestUtil.USERNAME })
    .execute();
  return result[0];
};

export const removeTestUser = (): Promise<DeleteResult> =>
  getConnection()
    .createQueryBuilder()
    .delete()
    .from(UserEntity)
    .where('username = :username', { username: TestUtil.USERNAME })
    .execute();
