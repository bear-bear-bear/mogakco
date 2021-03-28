import {
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Controller,
  UseGuards,
  UseFilters,
  UnauthorizedException,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'services/passport/jwt.payload';
import { Request, Response } from 'express';
import JwtAuthGuard from 'services/passport/jwt-guard';
import { AuthGuard } from '@nestjs/passport';
import UserService from '../services/user.service';
import createUserDTO from '../models/dto/create-user.dto';
import updateUserRequestDto from '../test/unit/Services/dto/update-user-request.dto';
import response from './dto/response';
import LoginBadRequestException from './exception/login.exception';
import LoginUserDTO from '../models/dto/login-user.dto';

@Controller('user')
class AuthController {
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
  @UseFilters(LoginBadRequestException)
  async login(@Body() req: LoginUserDTO, @Res() res: Response) {
    const user = await this.userService.findUserByEmail(req.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = { email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    // return req.user;
    return res
      .cookie('x-token', accessToken, {
        httpOnly: true,
      })
      .json({
        msg: 'token generated',
      });
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

  @UseGuards(JwtAuthGuard)
  @Post('/account')
  public async account(@Req() req: Request): Promise<any> {
    const { email } = req.user as any;
    console.log(req.user);
    const foundUser = await this.userService.findUserByEmail(email);
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    const { password, ...props } = foundUser;
    return props;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  public async logout(@Req() req: Request, @Res() res: Response) {
    res.setHeader('Set-Cookie', `x-token=; HttpOnly; Path=/; Max-Age=0`);
    return res.status(200).json({
      msg: 'logout',
    });
  }

  @Get('/me')
  // ERROR Unknown column 'NaN' in 'where clause'
  public async requestData(@Req() req: Request) {
    console.log(req.user);
    return {
      msg: '1',
    };
  }
}

export default AuthController;
