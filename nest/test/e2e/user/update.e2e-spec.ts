import { HttpStatus, INestApplication } from '@nestjs/common';
import getTestAppModule from '@test/e2e/helper/module';
import { createTestUser, findTestUser, removeTestUser } from '@test/e2e/helper/user';
import request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { APIs, TestUtil } from '@test/e2e/helper/enum';
import UserEntity from '@models/user/entities/user.entity';
import { evalResponseBodyMessage } from '@test/e2e/helper/support';

describe('사용자 정보 업데이트 e2e 테스트', () => {
  let app: INestApplication;
  let agent: SuperTest<Test>;
  let accessToken: string;
  let testUser: UserEntity;

  beforeAll(async () => {
    app = await getTestAppModule({ isValid: true, isCookieAble: true });
    agent = request(app.getHttpServer());
    await createTestUser();
    testUser = (await findTestUser()) as UserEntity;
  });

  afterAll(async () => {
    await removeTestUser();
    await app.close();
  });

  it('AccessToken 을 획득한다.', async () => {
    await agent
      .post(APIs.LOGIN)
      .send({
        email: TestUtil.EMAIL,
        password: TestUtil.PASSWORD,
      })
      .then(({ body }) => {
        accessToken = body.accessToken;
      });
  });

  it('이메일을 수정한다.', async () => {
    const { email, skills, job, id, username } = testUser;
    await agent
      .put(APIs.UPDATE_USER_SELF)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id,
        email,
        username,
        skills: [skills],
        job,
      })
      .then(({ body }) => {
        evalResponseBodyMessage(body, HttpStatus.OK, '계정 정보가 성공적으로 수정되었습니다.');
        expect(body).toHaveProperty('user');
        expect(body.user).toHaveProperty('id');
        expect(body.user).toHaveProperty('username');
        expect(body.user).toHaveProperty('email');
        expect(body.user).toHaveProperty('skills');
        expect(body.user).toHaveProperty('job');
      });
  });
});
