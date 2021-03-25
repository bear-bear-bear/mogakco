import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnection } from 'typeorm';
import AppModule from '../../modules/app.module';

describe('애플리케이션 실행 테스트', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    await app.close();
  });

  test('서버 애플리케이션이 정상적으로 실행된다.', async () => {
    const server = await app.listen(8888);
    expect(server).toHaveProperty('listen');
  });

  test('라우팅이 정상적으로 동작한다.', async () => {
    const response = await request(app.getHttpServer()).get('/user/test');
    expect(response.text).toBe('노원님 갓이세요.');
  });
});
