import { Injectable } from '@nestjs/common';
import UserService from './user.service';

@Injectable()
class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {

  }
}

export default AuthService;
