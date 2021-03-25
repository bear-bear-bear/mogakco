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
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'services/passport/jwt.payload';
import { AuthGuard } from '@nestjs/passport';
import UserService from '../services/user.service';
import createUserDTO from '../models/dto/create-user.dto';
import updateUserRequestDto from '../test/unit/Services/dto/update-user-request.dto';
import response from './dto/response';
import LocalAuthGuard from '../services/passport/local-auth.guard';
import LoginBadRequestException from './exception/login.exception';
import LoginUserDTO from '../models/dto/login-user.dto';

@Controller('user')
class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // test Get Controller
  @Get('/test')
  public getTest() {
    return encodeURIComponent(
      '준재형 지용이형 열심히 힘내서 달립시다. 수익내야죠?',
    );
  }

  @Post('/login')
  // @UseGuards(LocalAuthGuard)
  @UseFilters(LoginBadRequestException)
  async login(@Request() req: LoginUserDTO) {
    const user = await this.userService.findUserByEmail(req.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = { email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    // return req.user;
    return accessToken;
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

  @Post('/authenticate')
  @UseGuards(AuthGuard())
  testVerify(@Req() req: any) {
    console.log(req);
    return null;
  }
}

export default UserController;
