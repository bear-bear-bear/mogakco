import { HttpStatus, INestApplication } from '@nestjs/common';
import request, { SuperTest, Test } from 'supertest';
import getTestAppModule from '@test/e2e/helper/module';
import { createTestUser, removeTestUser } from '@test/e2e/helper/user';
import { APIs, TestUtil } from '@test/e2e/helper/enum';
import { evalResponseBodyMessage } from '@test/e2e/helper/support';

describe('사용자 삭제 e2e 테스트', () => {
  let app: INestApplication;
  let agent: SuperTest<Test>;
  let accessToken: string;

  beforeAll(async () => {
    app = await getTestAppModule({ isValid: true, isCookieAble: true });
    agent = request(app.getHttpServer());
    await createTestUser();
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

  it('테스트 유저를 삭제한다.', async () => {
    await agent
      .delete(APIs.DELETE_USER_SELF)
      .set('Authorization', `Bearer ${accessToken}`)
      .then(({ body }) =>
        evalResponseBodyMessage(body, HttpStatus.OK, '계정이 성공적으로 삭제되었습니다.'),
      );
  });
});
