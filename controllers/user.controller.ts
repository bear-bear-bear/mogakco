import { Body, Controller, Post } from '@nestjs/common';
import UserService from '../services/user.service';
import userDTO from '../models/dto/userDTO';
import User from '../models/entities/user';

@Controller('/api/user')
class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public createUser(@Body() user: userDTO): Promise<User> {
    return this.userService.createUserOne(user);
  }
}

export default UserController;
