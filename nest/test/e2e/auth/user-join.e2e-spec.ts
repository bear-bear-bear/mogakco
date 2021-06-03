import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import AppModule from '@modules/app.module';
import { getConnection } from 'typeorm';
import UserVerifyEntity from '@models/entities/user-verify.entity';
import request from 'supertest';
import CreateUserDto from '@models/dto/create-user.dto';
import UserFieldEntity from '@models/entities/user-field.entity';
import UserJobEntity from '@models/entities/users-job.entity';
import { evalResponseBodyMessage } from '../helper/support';

const TEST_EMAIL = 'mockTest@test.com';

const getIdList = (list: UserFieldEntity[] | UserJobEntity[]) => {
  const fieldIdList = list.map(({ id }) => id);
  return fieldIdList.length > 5 ? fieldIdList.slice(0, 5) : fieldIdList;
};

describe('사용자 관련 데이터 테스트', () => {
  let app: INestApplication;
  let fieldList: number[];
  let jobList: number[];
  let rand: number;
  let job: number;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    fieldList = getIdList(await UserFieldEntity.find());
    jobList = getIdList(await UserJobEntity.find());
    rand = Math.floor(Math.random() * jobList.length);
    job = jobList[rand];
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/auth - 사용자 회원가입', () => {
    it('이메일 인증 없이 회원가입을 시도한 경우 실패한다.', async () => {
      const now = new Date();
      const expiredAt = new Date(Date.now() + 1000 * 60 * 30);
      const currentVerification = await UserVerifyEntity.findOne({ email: TEST_EMAIL });

      if (currentVerification === undefined) {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(UserVerifyEntity)
          .values([
            { email: TEST_EMAIL, createdAt: now, isVerified: false, token: 'token', expiredAt },
          ])
          .execute();
      } else {
        currentVerification.isVerified = false;
        await currentVerification.save();
      }

      const user: CreateUserDto = {
        username: 'mogatest',
        email: TEST_EMAIL,
        password: '@Mogatest123',
        skills: fieldList,
        job,
      };

      await request(app.getHttpServer())
        .post('/api/auth')
        .send(user)
        .then(({ body: res }) => evalResponseBodyMessage(res, 400, '이메일 인증을 수행해주세요.'));
    });

    it('테스트를 위한 이메일 인증 성공 전환..', async () => {
      const currentVerification = (await UserVerifyEntity.findOne({
        email: TEST_EMAIL,
      })) as UserVerifyEntity;
      currentVerification.isVerified = true;
      await currentVerification.save();
      expect(currentVerification.isVerified).toBeTruthy();
    });

    it('닉네임 형식이 틀리면 실패한다.', async () => {
      const user: CreateUserDto = {
        username: 'ㄴ',
        email: TEST_EMAIL,
        password: '@Mogatest123',
        skills: fieldList,
        job,
      };

      await request(app.getHttpServer())
        .post('/api/auth')
        .send(user)
        .then(({ body: res }) => evalResponseBodyMessage(res, 400, '닉네임 형식이 맞지 않습니다.'));
    });
  });
});
