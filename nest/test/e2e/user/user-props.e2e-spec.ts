import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import getTestAppModule from '@test/e2e/helper/module';
import { GetSelectableProps } from '@models/user/interface/controller';

const validateSimpleItemProps = (item: GetSelectableProps) => {
  const { statusCode, message, list } = item;
  expect(typeof message).toBe('string');
  expect(typeof statusCode).toBe('number');
  if (list === null) {
    expect(list).toBeNull();
  } else {
    expect(list[0]).toHaveProperty('id');
    expect(list[0]).toHaveProperty('name');
  }
};

describe('사용자 관련 데이터 테스트', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getTestAppModule();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/users/skills - 희망 분야 리스트 불러오기 Api', async () => {
    await request(app.getHttpServer())
      .get('/api/user/skills')
      .then(({ body: fields }) => validateSimpleItemProps(fields));
  });

  it('GET /api/user/jobs - 직업 목록 리스트 불러오기 Api', async () => {
    await request(app.getHttpServer())
      .get('/api/user/jobs')
      .then(({ body: jobs }) => validateSimpleItemProps(jobs));
  });
});
