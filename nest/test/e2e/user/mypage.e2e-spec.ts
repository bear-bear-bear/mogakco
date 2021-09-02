import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import AppModule from '@src/app.module';

const loginForm = {
  email: 'mogakco35@gmail.com',
  password: 'mogapass',
};

describe('사용자 마이페이지 테스트', () => {
  let app: INestApplication;
  // let accessToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.use(cookieParser());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it.skip('로그인', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/login')
      .send(loginForm)
      .then(res => ({
        accessToken: res.headers['set-cookie'][0].split(';')[0].slice(12),
        body: res.body,
      }));
    // accessToken = response.accessToken;
  });

  // describe('GET /api/user - 사용자 본인 정보 확인', () => {
  //   it('유저 개인정보를 확인한다.', async () => {
  //     await request(app.getHttpServer())
  //       .get('/api/user')
  //       .set('Cookie', [`accessToken=${accessToken}`])
  //       .then(({ body: res }) => {
  //         expect(res).toHaveProperty('id');
  //         expect(res).toHaveProperty('username');
  //         expect(res).toHaveProperty('password');
  //         expect(res).toHaveProperty('skills');
  //         expect(res).toHaveProperty('job');
  //       });
  //   });
  // });
});
