import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import UserService from '../services/user.service';
import userDTO from '../models/dto/userDTO';
import User from '../models/entities/user';

@Controller('user')
class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public createUser(@Body(ValidationPipe) user: userDTO): Promise<User> {
    return this.userService.createUserOne(user);
  }
}

export default UserController;
