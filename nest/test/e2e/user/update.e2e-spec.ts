import { HttpStatus, INestApplication } from '@nestjs/common';
import getTestAppModule from '@test/e2e/helper/module';
import request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { APIs } from '@test/e2e/helper/enum';
import { evalResponseBodyMessage } from '@test/e2e/helper/support';
import { getConnection } from 'typeorm';
import UserRepository from '@models/user/repositories/user.repository';

describe('사용자 정보 업데이트 e2e 테스트', () => {
  let app: INestApplication;
  let agent: SuperTest<Test>;
  let accessToken: string;

  beforeAll(async () => {
    app = await getTestAppModule({ isValid: true, isCookieAble: true });
    agent = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('AccessToken 을 획득한다.', async () => {
    await agent
      .post(APIs.LOGIN)
      .send({
        email: 'mogakco35@gmail.com',
        password: 'mogapass',
      })
      .then(({ body }) => {
        accessToken = body.accessToken;
      });
  });

  it('이메일을 수정한다.', async () => {
    const user = await getConnection()
      .getCustomRepository(UserRepository)
      .findOne({
        where: { email: 'mogakco35@gmail.com' },
      });
    if (!user) throw new Error('유저가 없습니다.');
    const { id, email, username, skills, job } = user;
    await agent
      .put(APIs.UPDATE_USER_SELF)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id,
        email,
        username,
        skills,
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
