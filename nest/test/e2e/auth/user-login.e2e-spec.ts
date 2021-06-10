import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import AppModule from '@modules/app.module';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import { evalResponseBodyMessage, evalToStrictEqualBodyMessage } from '@test/e2e/helper/support';

describe('사용자 로그인 테스트', () => {
  let app: INestApplication;
  let loginForm: { email: string; password: string };
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    loginForm = {
      email: 'mogakco35@gmail.com',
      password: 'mogapass',
    };
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

  describe('POST /api/auth/login - 사용자 로그인', () => {
    it('로그인 시도에 잘못된 요청 양식을 보낼 경우 실패한다.', async () => {
      const wrongLoginForm = {
        email: loginForm.email,
      };

      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send(wrongLoginForm)
        .then(({ body: res }) => {
          evalToStrictEqualBodyMessage(res, {
            statusCode: 400,
            message: ['password must be a string'],
            error: 'Bad Request',
          });
        });
    });

    it('로그인에 성공하고 토큰 값을 반환받는다.', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send(loginForm)
        .then(res => ({
          accessToken: res.headers['set-cookie'][0].split(';')[0].slice(12),
          body: res.body,
        }));
      accessToken = response.accessToken;
      refreshToken = response.body.refreshToken;
      console.log({ refreshToken });
      evalResponseBodyMessage(response.body, 200, '로그인에 성공하였습니다!');
    });

    it('로그인 한 유저는 회원가입을 수행할 수 없다.', async () => {
      await request(app.getHttpServer())
        .post('/api/auth')
        .set('Cookie', [`accessToken=${accessToken}`])
        .then(({ body: res }) =>
          evalResponseBodyMessage(res, 401, '로그인 상태에서 접근할 수 없습니다.'),
        );
    });
  });

  describe('GET /api/auth/test - 로그인 상태 여부 ( 테스트 )', () => {
    it('로그인 한 상태면, accessToken 과 함께 간단한 유저 정보가 반환된다.', async () => {
      await request(app.getHttpServer())
        .get('/api/auth/test')
        .set('Cookie', [`accessToken=${accessToken}`])
        .then(({ body: res }) => {
          expect(res.cookies).toHaveProperty('accessToken');
          expect(res.user).toHaveProperty('id');
          expect(res.user).toHaveProperty('username');
        });
    });

    it('10분이 지나면 401 상태 코드가 반환된다.', async () => {
      await request(app.getHttpServer())
        .get('/api/auth/test')
        .then(({ body: res }) => {
          expect(res.statusCode).toBe(401);
        });
    });
  });

  describe('GET /api/auth/refresh-token - 새로운 accessToken 발급', () => {
    it('refreshToken 값이 검증되면 accessToken이 새로 발급된다.', async () => {
      await request(app.getHttpServer())
        .get('/api/auth/refresh-token')
        .set('Authorization', `bearer ${refreshToken}`)
        .then(({ body: res }) => evalResponseBodyMessage(res, 201, 'accessToken 갱신 완료!'));
    });

    it('refreshToken 값이 만료, 존재하지 않으면 401이 반환된다.', async () => {
      await request(app.getHttpServer())
        .get('/api/auth/refresh-token')
        .then(({ body: res }) => evalResponseBodyMessage(res, 401, 'Unauthorized'));
    });

    it('accessToken 새로 발급 후, /api/auth/test 가 정상적으로 응답된다.', async () => {
      const accessTokenResponse = await request(app.getHttpServer())
        .get('/api/auth/refresh-token')
        .set('Authorization', `bearer ${refreshToken}`)
        .then(({ headers }) => headers['set-cookie'][0].split(';')[0].slice(12));

      await request(app.getHttpServer())
        .get('/api/auth/test')
        .set('Cookie', [`accessToken=${accessTokenResponse}`])
        .then(({ body: res }) => {
          expect(res.cookies).toHaveProperty('accessToken');
          expect(res.user).toHaveProperty('id');
          expect(res.user).toHaveProperty('username');
        });
    });
  });

  describe('POST /api/auth/logout - 유저 로그아웃', () => {
    it('로그인 상태가 아니라면 401이 반환된다.', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/logout')
        .then(({ body: res }) => evalResponseBodyMessage(res, 401, 'Unauthorized'));
    });

    it('로그아웃을 정상적으로 수행한다.', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/logout')
        .set('Authorization', `bearer ${refreshToken}`)
        .then(({ body: res }) =>
          evalResponseBodyMessage(res, 200, 'mogauser 유저가 로그아웃 되었습니다.'),
        );
    });
  });
});
