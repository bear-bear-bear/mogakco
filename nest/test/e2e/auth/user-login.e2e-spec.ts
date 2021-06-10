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
      console.log({ accessToken, refreshToken });
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
});
