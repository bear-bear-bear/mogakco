import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import AppModule from '@modules/app.module';
import UserVerifyEntity from '@models/entities/user-verify.entity';

const TEST_EMAIL = 'mockTest@test.com';

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

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/auth/send-token/before-register - 이메일 인증 코드 발송', () => {
    it('이메일 발송에 성공한다.', async () => {
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
        .then(({ body: res }) => {
          expect(res.statusCode).toBe(200);
          expect(res.message).toBe('이메일 전송 성공');
        });
    });

    it('이메일이 아닌값이 올 경우 실패한다.', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/send-token/before-register')
        .send({ email: '개발자하기 너무 벅찬 현실이네요.' })
        .then(({ body: res }) => {
          expect(res.statusCode).toBe(400);
          expect(res.message).toBe('이메일 형식이 아닙니다.');
        });
    });
  });

  describe('GET /api/auth/verify-email/before-register - 이메일 클릭 시 인증 성공/실패 여부 검증', () => {
    it('30분이 지나기 전, 이메일을 확인하면 성공한다.', async () => {
      const verification = (await UserVerifyEntity.findOne({
        email: TEST_EMAIL,
      })) as UserVerifyEntity;
      const { id, token } = verification;

      await request(app.getHttpServer())
        .get(`/api/auth/verify-email/before-register?id=${id}&token=${token}`)
        .then(({ headers }) => {
          expect(headers.location.includes('true')).toBeTruthy();
          expect(headers.location.includes(TEST_EMAIL)).toBeTruthy();
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
          expect(headers.location.includes('false')).toBeTruthy();
        });
    });
  });

  describe('GET /api/auth/is-verified/before-register - 클라이언트에서 이메일 검증 여부 요청', () => {
    it('Query URL 이메일 정보가 없으면 실패한다.', async () => {
      await request(app.getHttpServer())
        .get(`/api/auth/is-verified/before-register`)
        .then(({ body: res }) => {
          expect(res.statusCode).toBe(400);
          expect(res.message).toBe('이메일 필드가 존재하지 않습니다.');
        });
    });

    it('Query URL 이메일 형식이 아니면 실패한다.', async () => {
      await request(app.getHttpServer())
        .get(`/api/auth/is-verified/before-register?email='wearedevelopment'`)
        .then(({ body: res }) => {
          expect(res.statusCode).toBe(400);
          expect(res.message).toBe('이메일 형식이 아닙니다.');
        });
    });

    it('이메일 확인을 하지 않았거나, 시간초과로 실패한 유저는 false 값이 온다.', async () => {
      await request(app.getHttpServer())
        .get(`/api/auth/is-verified/before-register?email=${TEST_EMAIL}`)
        .then(({ body: res }) => {
          expect(res.statusCode).toBe(401);
          expect(res.message).toBe('인증에 실패하였습니다.');
        });

      const verification = (await UserVerifyEntity.findOne({
        email: TEST_EMAIL,
      })) as UserVerifyEntity;
      verification.isVerified = true;
      await verification.save();
    });

    it('이메일을 확인했다면 true 값이 반환된다.', async () => {
      await request(app.getHttpServer())
        .get(`/api/auth/is-verified/before-register?email=${TEST_EMAIL}`)
        .then(({ body: res }) => {
          expect(res.statusCode).toBe(200);
          expect(res.message).toBe(true);
        });
    });
  });
});
