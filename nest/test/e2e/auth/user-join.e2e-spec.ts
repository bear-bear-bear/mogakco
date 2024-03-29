import { INestApplication } from '@nestjs/common';
import { getConnection } from 'typeorm';
import request, { SuperTest, Test } from 'supertest';
import UserVerifyEntity from '@models/user/entities/user-verify.entity';
import UserEntity from '@models/user/entities/user.entity';
import { getRandomFieldList, getRandomJob } from '@common/helpers/test.helper';
import getTestAppModule from '@test/e2e/helper/module';
import CreateUserDto from '@authentication/dto/create-user.dto';
import { evalResponseBodyMessage, evalToContainBodyMessage } from '../helper/support';
import { APIs, TestUtil } from '@test/e2e/helper/enum';

describe('사용자 관련 데이터 테스트', () => {
  let app: INestApplication;
  let agent: SuperTest<Test>;
  let user: CreateUserDto;

  beforeAll(async () => {
    app = await getTestAppModule({
      isValid: true,
      isCookieAble: true,
    });
    agent = request(app.getHttpServer());
    user = {
      username: 'mogatest',
      email: TestUtil.EMAIL,
      password: '@Mogatest123',
      skills: await getRandomFieldList(),
      job: await getRandomJob(),
    };
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/auth - 사용자 회원가입', () => {
    it('이메일 인증 없이 회원가입을 시도한 경우 실패한다.', async () => {
      const now = new Date();
      const expiredAt = new Date(Date.now() + 1000 * 60 * 30);
      const currentVerification = await UserVerifyEntity.findOne({ email: TestUtil.EMAIL });

      if (currentVerification === undefined) {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(UserVerifyEntity)
          .values([
            { email: TestUtil.EMAIL, createdAt: now, isVerified: false, token: 'token', expiredAt },
          ])
          .execute();
      } else {
        currentVerification.isVerified = false;
        await currentVerification.save();
      }

      await agent
        .post(APIs.JOIN)
        .send(user)
        .then(({ body: res }) => evalResponseBodyMessage(res, 401, '이메일 인증을 수행해주세요.'));
    });

    it('테스트를 위한 이메일 인증 성공 전환..', async () => {
      const currentVerification = (await UserVerifyEntity.findOne({
        email: TestUtil.EMAIL,
      })) as UserVerifyEntity;
      currentVerification.isVerified = true;
      await currentVerification.save();
      expect(currentVerification.isVerified).toBeTruthy();
    });

    it('회원가입에 성공한다.', async () => {
      const current = await UserEntity.findOne({ email: TestUtil.EMAIL });
      if (current !== undefined) {
        await current.remove();
      }

      await agent
        .post(APIs.JOIN)
        .send(user)
        .then(({ body: res }) => evalResponseBodyMessage(res, 201, '유저가 생성되었습니다.'));
    });

    it('이미 회원가입한 유저는 예외처리된다.', async () => {
      await agent
        .post(APIs.JOIN)
        .send(user)
        .then(({ body: res }) => evalResponseBodyMessage(res, 409, '이미 존재하는 유저입니다.'));
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(UserEntity, 'user')
        .where('email = :email', { email: TestUtil.EMAIL });
    });

    it('닉네임 형식이 맞지 않으면 실패한다.', async () => {
      const unMatchUser = {
        ...user,
        username: 'ㄴ',
      };

      await agent
        .post(APIs.JOIN)
        .send(unMatchUser)
        .then(({ body: res }) =>
          evalToContainBodyMessage(res, 400, '닉네임 형식이 맞지 않습니다.'),
        );
    });

    it('패스워드 형식이 맞지 않으면 실패한다.', async () => {
      const unMatchUser = {
        ...user,
        password: 'junjaewilla+',
      };

      await agent
        .post(APIs.JOIN)
        .send(unMatchUser)
        .then(({ body: res }) =>
          evalToContainBodyMessage(res, 400, '패스워드 형식이 맞지 않습니다.'),
        );
    });

    it('관심 분야는 5개 이상 등록 할 수 없다.', async () => {
      const unMatchUser = {
        ...user,
        skills: [1, 2, 3, 4, 5, 6],
      };

      await agent
        .post(APIs.JOIN)
        .send(unMatchUser)
        .then(({ body: res }) =>
          evalToContainBodyMessage(res, 400, '관심 분야는 5개 이상 등록 할 수 없습니다.'),
        );
    });
  });
});
