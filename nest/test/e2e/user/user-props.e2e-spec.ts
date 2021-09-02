import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ISimpleItemProps } from '@test/type/mock-data-type';
import AppModule from '@src/app.module';

const validateSimpleItemProps = (
  item: ISimpleItemProps & { createdAt: string; updatedAt: string },
) => {
  expect(item).toBeTruthy();
  expect(item).toHaveProperty('id');
  expect(item).toHaveProperty('name');
  expect(item).toHaveProperty('createdAt');
  expect(item).toHaveProperty('updatedAt');
};

describe('사용자 관련 데이터 테스트', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it.skip('GET /api/users/skills - 희망 분야 리스트 불러오기 Api', async () => {
    await request(app.getHttpServer())
      .get('/api/user/skills')
      .then(({ body: fields }) => validateSimpleItemProps(fields[0]));
  });

  it.skip('GET /api/user/jobs - 직업 목록 리스트 불러오기 Api', async () => {
    await request(app.getHttpServer())
      .get('/api/user/jobs')
      .then(({ body: jobs }) => validateSimpleItemProps(jobs[0]));
  });

  afterAll(async () => {
    await app.close();
  });
});
