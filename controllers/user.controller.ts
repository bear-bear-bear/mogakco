import {
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Controller,
} from '@nestjs/common';
import UserService from '../services/user.service';
import userDTO from '../models/dto/userDTO';
import updateUserRequest from '../test/unit/Services/dto/updateUserRequest';
import response from './dto/response';

@Controller('/user')
class UserController {
  constructor(private userService: UserService) {}

  // test Get Controller
  @Get('/test')
  public getTest() {
    return '준재형 지용이형 열심히 힘내서 달립시다. 수익내야죠?';
  }

  @Post()
  public async join(@Body() user: userDTO): Promise<response> {
    const res = await this.userService.join(user);
    return res;
  }

  @Get('/:id')
  public findUserOne(@Param('id') id: number) {
    const findUser = this.userService.findUserOne(id);
    return findUser;
  }

  @Get('/:username')
  public async findUserByName(@Param('username') username: string) {
    const findUser = await this.userService.findUserByName(username);
    return findUser;
  }

  @Delete(':id')
  public deleteUserOne(@Param('id') id: number) {
    const deleteUser = this.userService.deleteUser(id);
    return deleteUser;
  }

  @Patch(':id')
  public updateUserOne(@Body() user: updateUserRequest) {
    const updateUser = this.userService.updateUserOne(user);
    return updateUser;
  }
}

export default UserController;
