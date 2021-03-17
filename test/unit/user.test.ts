/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserService from '../../services/user.service';
import userDTO from '../../models/dto/userDTO';
import User from '../../models/entities/user';

let id = 1;
class UserMockRepository {
  public async createUserOne(user: userDTO) {
    return {
      id,
      username: user.username,
      password: user.password,
      email: user.email,
    };
  }
}

describe('유저 CRUD 유닛 테스트', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserMockRepository,
        },
      ],
    }).compile();

    userService = module.get(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  describe('유저 정보 생성', () => {
    test('사용자를 생성한다.', async () => {
      const user: userDTO = {
        username: 'eunjunjung123',
        password: 'ihavegf',
        email: 'bear-bear-bear@god.com',
      };

      const createdUser: User = await userService.createUserOne(user);
      id++;

      expect(createdUser.id).toBe(1);
      expect(createdUser).toMatchObject({ username: 'eunjunjung123' });
      expect(createdUser).toMatchObject({ email: 'bear-bear-bear@god.com' });
    });

    test('생성된 사용자의 id는 2번이다.', async () => {
      const user: userDTO = {
        username: 'eunjunjung456',
        password: 'ihavegf',
        email: 'bear-bear-bear@kinggod.com',
      };

      const createdUser: User = await userService.createUserOne(user);
      expect(createdUser.id).toBe(2);
    });
  });
  // describe('유저 정보 조회', () => {});
  // describe('유저 정보 수정', () => {});
  // describe('유저 정보 삭제', () => {});
});
