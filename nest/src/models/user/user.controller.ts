import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '@common/guards/jwt-auth.guard';
import UserService from './user.service';
import { GetAllFieldSwagger, GetAllJobSwagger } from '@common/decorators/swagger/user.decorator';
import {
  AuthRequest,
  GetSelectableProps,
  IUserController,
} from '@models/user/interface/controller';

@Controller('user')
export default class UserController implements IUserController {
  constructor(private userService: UserService) {}

  /**
   * @desc 현재 사용 안함 ( 정상작동 체크 안함 )
   */
  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getUserSelfInfo(@Req() req: AuthRequest): Promise<any> {
    const userInfo = await this.userService.findUserForLogin(req.user.id);
    return userInfo;
  }

  @GetAllFieldSwagger()
  @Get('/skills')
  @HttpCode(HttpStatus.OK)
  async getAllFields(): Promise<GetSelectableProps> {
    const fieldList = await this.userService.findAllFields();
    return {
      statusCode: HttpStatus.OK,
      message: '불러오기 성공',
      list: fieldList,
    };
  }

  @GetAllJobSwagger()
  @Get('/jobs')
  async getAllJobs(): Promise<GetSelectableProps> {
    const jobList = await this.userService.findAllJobs();
    return {
      statusCode: HttpStatus.OK,
      message: '불러오기 성공',
      list: jobList,
    };
  }
}
