/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import createUserDTO from '../../../models/dto/create-user.dto';
import UserService from '../../../services/user.service';
import User from '../../../models/entities/user';
import UserMockRepository from '../helper/userMockRepository';
import updateUserRequestDto from './dto/update-user-request.dto';

// test
describe('유저 CRUD 유닛 테스트', () => {
  let userService: UserService;

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
  });

  describe('유저 정보 생성', () => {
    test('사용자를 생성한다.', async () => {
      const user: createUserDTO = {
        username: 'eunjunjung123',
        password: 'ihavegf',
        email: 'bear-bear-bear@god.com',
      };
      const createdUser: User = await userService.createUserOne(user);
      expect(createdUser.id).toBe(1);
      expect(createdUser).toMatchObject({ username: 'eunjunjung123' });
      expect(createdUser).toMatchObject({ email: 'bear-bear-bear@god.com' });
    });

    // test('생성된 사용자의 id는 2번이다.', async () => {
    //   const user: userDTO = {
    //     username: 'eunjunjung456',
    //     password: 'ihavegf',
    //     email: 'bear-bear-bear@kinggod.com',
    //   };
    //
    //   const createdUser: User = await userService.createUserOne(user);
    //   expect(createdUser.id).toBe(2);
    // });

    test('잘못된 사용자 생성은 수행되지 않는다.', async () => {
      try {
        await userService.createUserOne({
          username: 'iloveyou',
        } as createUserDTO);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe('올바른 요청이 아닙니다.');
      }
    });
  });

  describe('유저 정보 조회', () => {
    test('id 1번 사용자 정보를 조회한다.', () => {
      expect(userService.findUserOne(1)).toMatchObject({
        id: 1,
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

  describe('유저 정보 수정', () => {
    test('id 1번 사용자의 정보를 수정한다.', () => {
      const user: updateUserRequestDto = {
        username: 'galaxy4276',
        email: 'galaxy4276@gmail.com',
      };

      const changed = userService.updateUserOne(user);
      expect(changed).toMatchObject({
        id: 1,
        username: 'galaxy4276',
        email: 'galaxy4276@gmail.com',
      });
    });

    test('잘못된 사용자 수정을 수행한다.', () => {
      try {
        const wrongUser = {
          username: 'erroruser',
          sex: 'male',
        };
        userService.updateUserOne(wrongUser);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe('올바른 요청이 아닙니다.');
      }
    });
  });

  describe('유저 정보 삭제', () => {
    test('id 1번 사용자 정보를 삭제한다.', () => {
      expect(userService.deleteUser(1)).toBe(HttpStatus.ACCEPTED);
    });

    test('존재하지 않는 사용자를 삭제한다.', () => {
      try {
        userService.deleteUser(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('존재하지 않는 요청입니다.');
      }
    });
  });
});
