import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../models/repositories/user.repository';
import createUserDTO from '../models/dto/create-user.dto';
import updateUserRequestDto from '../test/unit/Services/dto/update-user-request.dto';
import makeHash from '../test/unit/Services/helper/makeHash';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public createUserOne(user: createUserDTO) {
    return this.userRepository.createUserOne(user);
  }

  public findUserOne(id: number) {
    return this.userRepository.findUserOne(id);
  }

  public findUserByName(username: string) {
    return this.userRepository.findUserByName(username);
  }

  public findUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  public updateUserOne(user: updateUserRequestDto) {
    return this.userRepository.updateUser(user);
  }

  public deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }

  public async join({ username, password, email }: createUserDTO) {
    const currentUser = await this.userRepository.findUserByName(username);
    if (currentUser) {
      throw new HttpException(
        '이미 존재하는 유저입니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const hashedPassword = await makeHash(password);

    await this.createUserOne({
      username,
      password: hashedPassword as string,
      email,
    });

    return { message: '유저가 생성되었습니다.', status: 201 };
  }
}

export default UserService;
