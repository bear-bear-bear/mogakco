import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { evalResponseBodyMessage, evalToStrictEqualBodyMessage } from '@test/e2e/helper/support';
import getTestAppModule from '@test/e2e/helper/module';

// TODO!: refreshToken 이 Cookie-Set 이 될 경우 테스트 케이스에서만 에러가 발생 중.
describe('사용자 로그인 테스트', () => {
  let app: INestApplication;
  const loginForm: { email: string; password: string } = {
    email: 'mogakco35@gmail.com',
    password: 'mogapass',
  };
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    app = await getTestAppModule({
      isCookieAble: true,
      isValid: true,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/auth/login - 사용자 로그인', () => {
    it.skip('로그인 시도에 잘못된 요청 양식을 보낼 경우 실패한다.', async () => {
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

    // res.headers['set-cookie'][0].split(';')[0].slice(12)
    it('로그인에 성공하고 토큰 값을 반환받는다.', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send(loginForm)
        .then(res => ({
          accessToken: res.body.accessToken,
          refreshToken: res.headers['set-cookie'][0].split(';')[0].slice(13),
          body: res.body,
        }));
      accessToken = response.accessToken;
      refreshToken = response.refreshToken;
      evalResponseBodyMessage(response.body, 200, '로그인에 성공하였습니다!');
    });

    it.skip('로그인 한 유저는 회원가입을 수행할 수 없다.', async () => {
      await request(app.getHttpServer())
        .post('/api/auth')
        .set('Authorization', `Bearer ${accessToken}`)
        .then(({ body: res }) =>
          evalResponseBodyMessage(res, 401, '로그인 상태에서 접근할 수 없습니다.'),
        );
    });
  });

  describe('GET /api/auth/test - 로그인 상태 여부 ( 테스트 )', () => {
    it.skip('로그인 한 상태면, accessToken 과 함께 간단한 유저 정보가 반환된다.', async () => {
      await request(app.getHttpServer())
        .get('/api/auth/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .then(({ body: res }) => {
          expect(res.user).toHaveProperty('id');
          expect(res.user).toHaveProperty('username');
        });
    });

    it.skip('10분이 지나면 401 상태 코드가 반환된다.', async () => {
      await request(app.getHttpServer())
        .get('/api/auth/test')
        .then(({ body: res }) => {
          expect(res.statusCode).toBe(401);
        });
    });
  });

  describe('GET /api/auth/refresh-token - 새로운 accessToken 발급', () => {
    it.skip('refreshToken 값이 검증되면 accessToken이 새로 발급된다.', async () => {
      await request(app.getHttpServer())
        .get('/api/auth/refresh-token')
        .set('Cookie', [`refreshToken=${refreshToken}`])
        .then(res => {
          console.log(res);
          evalResponseBodyMessage(res.body, 201, 'accessToken 갱신 완료!');
        });
    });

    it.skip('refreshToken 값이 만료, 존재하지 않으면 401이 반환된다.', async () => {
      await request(app.getHttpServer())
        .get('/api/auth/refresh-token')
        .then(({ body: res }) => evalResponseBodyMessage(res, 401, 'Unauthorized'));
    });

    // TODO: 해당 테스트 확인하기
    // it('accessToken 새로 발급 후, /api/auth/test 가 정상적으로 응답된다.', async () => {
    //   await request(app.getHttpServer())
    //     .get('/api/auth/refresh-token')
    //     .set('Cookie', [`refreshToken=${refreshToken}`])
    //     .then(({ headers }) => headers['set-cookie'][0].split(';')[0].slice(12));
    //
    //   await request(app.getHttpServer())
    //     .get('/api/auth/test')
    //     .set('Authorization', `Bearer ${accessToken}`)
    //     .then(({ body: res }) => {
    //       expect(res.cookies).toHaveProperty('accessToken');
    //       expect(res.user).toHaveProperty('id');
    //       expect(res.user).toHaveProperty('username');
    //     });
    // });
  });

  describe('POST /api/auth/logout - 유저 로그아웃', () => {
    it.skip('로그인 상태가 아니라면 401이 반환된다.', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/logout')
        .then(({ body: res }) => evalResponseBodyMessage(res, 401, 'Unauthorized'));
    });

    it.skip('로그아웃을 정상적으로 수행한다.', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/logout')
        .set('Cookie', `refreshToken=${refreshToken}`)
        .then(({ body: res }) =>
          evalResponseBodyMessage(res, 200, 'mogauser 유저가 로그아웃 되었습니다.'),
        );
    });
  });

  describe('GET /api/auth/user 유저 인증여부 검사', () => {
    it.skip('로그인 상태가 아니라면 boolean 값이 false 가 된다.', async () => {
      await request(app.getHttpServer())
        .get('/api/auth/user')
        .then(({ body: res }) => {
          expect(res.isLoggedIn).toBeFalsy();
        });
    });

    it('로그인 상태라면 boolean 값이 true 가 된다. ( user 정보 포함 )', async () => {
      let temporalToken;
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send(loginForm)
        .then(({ body: res }) => {
          temporalToken = res.accessToken;
        });
      await request(app.getHttpServer())
        .get('/api/auth/user')
        .set('Authorization', `Bearer ${temporalToken}`)
        .then(({ body: res }) => {
          expect(res.isLoggedIn).toBeTruthy();
        });
    });
  });
});
