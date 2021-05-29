import { BadRequestException, HttpStatus, NotFoundException } from '@nestjs/common';
import createUserDto from '@models/dto/create-user.dto';
// import updateUserRequestDto from '@services/dto/update-user-request.dto';

class UserMockRepository {
  public createUserOne(user: createUserDto) {
    if (!user.email || !user.username || !user.password) {
      throw new BadRequestException('올바른 요청이 아닙니다.');
    }
    return {
      id: 1,
      username: user.username,
      password: user.password,
      email: user.email,
    };
  }

  public testReadAndDelete(id: number, flag: boolean) {
    /*
      true is read therefore false is delete
      sorry for design fucking method.
      please lead me more better things JY & JJ.
    */
    if (id === 999) {
      throw new NotFoundException('존재하지 않는 요청입니다.');
    }
    return flag
      ? {
          id: 1,
          username: 'eunjunjung123',
          email: 'bear-bear-bear@god.com',
        }
      : HttpStatus.ACCEPTED;
  }

  public findUserOne(id: number) {
    return this.testReadAndDelete(id, true);
  }

  public deleteUser(id: number) {
    return this.testReadAndDelete(id, false);
  }

  public updateUser(user: any) {
    // 임시 any
    const currentUser = {
      id: 1,
      username: 'eunjunjung123',
      email: 'bear-bear-bear@god.com',
    };

    if (Object.keys(user).includes('sex')) throw new BadRequestException('올바른 요청이 아닙니다.');

    return {
      ...currentUser,
      ...user,
    };
  }
}

export default UserMockRepository;
