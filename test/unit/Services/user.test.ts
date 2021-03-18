/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import userDTO from '../../../models/dto/userDTO';
import UserService from '../../../services/user.service';
import User from '../../../models/entities/user';

let userId = 1;
class UserMockRepository {
  public createUserOne(user: userDTO) {
    if (!user.email || !user.username || !user.password) {
      throw new BadRequestException('올바른 요청이 아닙니다.');
    }
    return {
      id: userId,
      username: user.username,
      password: user.password,
      email: user.email,
    };
  }

  public findUserOne(id: number) {
    if (id === 999) {
      throw new NotFoundException('존재하지 않는 요청입니다.');
    }
    return {
      id: userId,
      username: 'eunjunjung123',
      email: 'bear-bear-bear@god.com',
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
      userId++;

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
      userId = 1;
    });

    test('잘못된 사용자 생성은 수행되지 않는다.', async () => {
      try {
        await userService.createUserOne({
          username: 'iloveyou',
        } as userDTO);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe('올바른 요청이 아닙니다.');
      }
    });
  });

  describe('유저 정보 조회', () => {
    test('id 1번 사용자 정보를 조회한다.', () => {
      expect(userService.findUserOne(1)).toMatchObject({
        id: userId,
        username: 'eunjunjung123',
        email: 'bear-bear-bear@god.com',
      });
    });

    test('존재하지 않는 사용자를 조회한다.', () => {
      try {
        userService.findUserOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('존재하지 않는 요청입니다.');
      }
    });
  });
  // describe('유저 정보 수정', () => {});
  // describe('유저 정보 삭제', () => {});
});
