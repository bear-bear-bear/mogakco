import UserRepository from '@models/user/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserRepository 단위 테스트', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
    }).compile();
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('findUserByEmailForLogin 테스트', () => {
    it('모든 정보를 성공적으로 불러온다.', async () => {
      const result = {
        id: 1,
        username: 'test',
        email: 'test',
        password: 'test',
        skills: null,
        job: undefined,
        hashedRefreshToken: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
      };
      // @ts-ignore
      jest.spyOn(userRepository, 'findUserByEmailForLogin').mockImplementation(() => result);
      const user = await userRepository.findUserByEmailForLogin('mogakco35@gmail.com');
      expect(user).toBe(result);
    });
  });
});
