import {
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Controller,
  UseGuards,
  Request,
  UseFilters,
  HttpCode,
} from '@nestjs/common';
import UserService from '../services/user.service';
import createUserDTO from '../models/dto/create-user.dto';
import updateUserRequestDto from '../test/unit/Services/dto/update-user-request.dto';
import response from './dto/response';
import LocalAuthGuard from '../services/passport/local-auth.guard';
import LoginBadRequestException from './exception/login.exception';
import LoginUserDTO from '../models/dto/login-user.dto';

@Controller('user')
class UserController {
  constructor(private userService: UserService) {}

  // test Get Controller
  @Get('/test')
  @HttpCode(200)
  public getTest() {
    return '노원님 갓이세요.';
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @UseFilters(LoginBadRequestException)
  async login(@Request() req: LoginUserDTO) {
    return req.user;
  }

  @Post()
  async join(@Body() user: createUserDTO): Promise<response> {
    const res = await this.userService.join(user);
    return res;
  }

  @Get('/:id')
  findUserOne(@Param('id') id: number) {
    const findUser = this.userService.findUserOne(id);
    return findUser;
  }

  @Get('/:username')
  async findUserByName(@Param('username') username: string) {
    const findUser = await this.userService.findUserByName(username);
    return findUser;
  }

  @Delete(':id')
  deleteUserOne(@Param('id') id: number) {
    const deleteUser = this.userService.deleteUser(id);
    return deleteUser;
  }

  @Patch(':id')
  updateUserOne(@Body() user: updateUserRequestDto) {
    const updateUser = this.userService.updateUserOne(user);
    return updateUser;
  }
}

export default UserController;
