import { getConnection } from 'typeorm';
import UserJobEntity from '@models/user/entities/users-job.entity';

type RowQueryResult = {
  id: number;
}[];

const getRand = (length: number) => Math.floor(Math.random() * length);
const parseTextRows = (queryResult: RowQueryResult) => queryResult.map(q => q.id);

/**
 * @return 5개가 넘지않은 임의의 희망 분야 id 배열이 반환된다.
 */
export const getRandomFieldList = async () => {
  const fieldList = (await getConnection().query('SELECT id FROM users_field')) as RowQueryResult;
  const idList = parseTextRows(fieldList);
  const { length } = idList;
  const randFieldIdList = Array(getRand(length))
    .fill(0)
    .map(() => idList[getRand(length)]);
  const setArray = Array.from(new Set(randFieldIdList));
  if (setArray.length > 5) {
    return setArray.slice(0, 5);
  }
  if (setArray.length === 0) {
    return null;
  }
  return Array.from(setArray);
};

/**
 * @return 임의의 1개 직업 id가 반환된다.
 */
export const getRandomJob = async () => {
  const jobList = (await getConnection().query('SELECT id FROM users_job')) as RowQueryResult;
  const idList = parseTextRows(jobList);
  const jobId = idList[getRand(jobList.length)];
  const job = (await UserJobEntity.findOne(jobId)) as UserJobEntity;
  return job as unknown as UserJobEntity;
};
