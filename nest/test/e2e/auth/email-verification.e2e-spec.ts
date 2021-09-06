import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { evalResponseBodyMessage } from '@test/e2e/helper/support';
import UserVerifyEntity from '@models/user/entities/user-verify.entity';
import UserEntity from '@models/user/entities/user.entity';
import getTestAppModule from '@test/e2e/helper/module';

const TEST_EMAIL = 'mockTest@test.com';

describe('사용자 관련 데이터 테스트', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getTestAppModule({
      isCookieAble: true,
      isValid: true,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/auth/send-token/before-register - 이메일 인증 코드 발송', () => {
    it('이메일 발송에 성공한다.', async () => {
      const user = await UserEntity.findOne({ email: TEST_EMAIL });
      if (user) await user.remove();
      const currentVerification = await UserVerifyEntity.findOne({ email: TEST_EMAIL });

      if (!currentVerification) {
        const newVerification = new UserVerifyEntity();
        newVerification.email = TEST_EMAIL;
        newVerification.token = 'token';
        newVerification.expiredAt = new Date(Date.now() + 1000 * 60 * 30);
        await newVerification.save();
      }

      await request(app.getHttpServer())
        .post('/api/auth/send-token/before-register')
        .send({ email: TEST_EMAIL })
        .then(({ body: res }) => evalResponseBodyMessage(res, 200, '이메일 전송 성공'));
    });

    it('이메일이 아닌값이 올 경우 실패한다.', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/send-token/before-register')
        .send({ email: '개발자하기 너무 벅찬 현실이네요.' })
        .then(({ body: res }) => evalResponseBodyMessage(res, 400, '이메일 형식이 아닙니다.'));
    });

    it('이미 가입한 유저에게는 에러 메시지를 반환한다.', async () => {
      const user = await UserEntity.findOne({ email: TEST_EMAIL });
      if (user === undefined) {
        const testUser = new UserEntity();
        testUser.username = 'testuser';
        testUser.email = TEST_EMAIL;
        testUser.skills = [1];
        testUser.password = 'test';
        testUser.createdAt = new Date();
        testUser.updatedAt = new Date();
        await testUser.save();
      }

      await request(app.getHttpServer())
        .post('/api/auth/send-token/before-register')
        .send({ email: TEST_EMAIL })
        .then(({ body: res }) => evalResponseBodyMessage(res, 400, '이미 가입한 유저입니다.'));
      const deleteUser = (await UserEntity.findOne({ email: TEST_EMAIL })) as UserEntity;
      await deleteUser.remove();
    });
  });

  describe('GET /api/auth/verify-email/before-register - 이메일 클릭 시 인증 성공/실패 여부 검증', () => {
    it.skip('30분이 지나기 전, 이메일을 확인하면 성공한다.', async () => {
      const verification = (await UserVerifyEntity.findOne({
        email: TEST_EMAIL,
      })) as UserVerifyEntity;
      const { id, token } = verification;

      await request(app.getHttpServer())
        .get(`/api/auth/verify-email/before-register?id=${id}&token=${token}`)
        .then(({ headers }) => {
          console.log(headers);
          expect(headers.location).toContain(true);
          expect(headers.location).toContain(TEST_EMAIL);
        });
    });

    it('30분이 지난 후, 이메일을 확인하면 실패한다.', async () => {
      const verification = (await UserVerifyEntity.findOne({
        email: TEST_EMAIL,
      })) as UserVerifyEntity;
      verification.isVerified = false;
      verification.expiredAt = new Date(Date.now() - 1000 * 60);
      await verification.save();
      const { id, token } = verification;

      await request(app.getHttpServer())
        .get(`/api/auth/verify-email/before-register?id=${id}&token=${token}`)
        .then(({ headers }) => {
          expect(headers.location).toContain(false);
        });
    });
  });

  describe('GET /api/auth/is-verified/before-register - 클라이언트에서 이메일 검증 여부 요청', () => {
    it('Query URL 이메일 정보가 없으면 실패한다.', async () => {
      await request(app.getHttpServer())
        .get(`/api/auth/is-verified/before-register`)
        .then(({ body: res }) =>
          evalResponseBodyMessage(res, 400, '이메일 필드가 존재하지 않습니다.'),
        );
    });

    it('Query URL 이메일 형식이 아니면 실패한다.', async () => {
      await request(app.getHttpServer())
        .get(`/api/auth/is-verified/before-register?email='wearedevelopment'`)
        .then(({ body: res }) => evalResponseBodyMessage(res, 400, '이메일 형식이 아닙니다.'));
    });

    it('이메일 확인을 하지 않았거나, 시간초과로 실패한 유저는 false 값이 온다.', async () => {
      await request(app.getHttpServer())
        .get(`/api/auth/is-verified/before-register?email=${TEST_EMAIL}`)
        .then(({ body: res }) => evalResponseBodyMessage(res, 401, '인증에 실패하였습니다.'));

      const verification = (await UserVerifyEntity.findOne({
        email: TEST_EMAIL,
      })) as UserVerifyEntity;
      verification.isVerified = true;
      await verification.save();
    });

    it('이메일을 확인했다면 true 값이 반환된다.', async () => {
      await request(app.getHttpServer())
        .get(`/api/auth/is-verified/before-register?email=${TEST_EMAIL}`)
        .then(({ body: res }) => evalResponseBodyMessage(res, 200, true));
    });

    it('이미 가입된 이메일에 대한 검증 요청은 에러가 발생한다.', async () => {
      const testUser = new UserEntity();
      testUser.username = 'testuser';
      testUser.email = TEST_EMAIL;
      testUser.skills = [1];
      testUser.password = 'test';
      testUser.createdAt = new Date();
      testUser.updatedAt = new Date();
      await testUser.save();

      await request(app.getHttpServer())
        .get(`/api/auth/is-verified/before-register?email=${TEST_EMAIL}`)
        .then(({ body: res }) => evalResponseBodyMessage(res, 400, '이미 가입된 이메일입니다.'));
      const deleteUser = (await UserEntity.findOne({ email: TEST_EMAIL })) as UserEntity;
      await deleteUser.remove();
    });
  });
});
