import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from '@common/guards/jwt-auth.guard';
import UserService from './user.service';
import DeleteUserSwagger, {
  GetAllFieldSwagger,
  GetAllJobSwagger,
  UpdateUserSwagger,
} from '@common/decorators/swagger/user.decorator';
import {
  AuthRequest,
  GetSelectableProps,
  IUserController,
  UpdateUser,
} from '@models/user/interface/controller';
import UpdateUserDto from '@authentication/dto/update-user.dto';
import { GeneralResponse } from '@common/interface/global';
import UserRepository from '@models/user/repositories/user.repository';
import { Response } from 'express';

@Controller('user')
export default class UserController implements IUserController {
  private readonly logger = new Logger('UserController');

  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

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

  @UpdateUserSwagger()
  @Put('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async changeUserInfoFromMyPage(
    @Req() req: AuthRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUser> {
    const user = await this.userService.changeUserInfo(req.user.id, updateUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: '계정 정보가 성공적으로 수정되었습니다.',
      user,
    };
  }

  @DeleteUserSwagger()
  @Delete('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteUserFromMyPage(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<GeneralResponse> {
    try {
      await this.userRepository.softDelete({ id: req.user.id });
      res.clearCookie('refreshToken');
      return {
        statusCode: HttpStatus.OK,
        message: '계정이 성공적으로 삭제되었습니다.',
      };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException('서버에서 에러가 발생하였습니다.');
    }
  }
}
