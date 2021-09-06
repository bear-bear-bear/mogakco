import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '@common/guards/jwt-auth.guard';
import UserService from './user.service';

@Controller('user')
class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getUserSelfInfo(@Req() req: Request & { user: { id: number; username: string } }) {
    const userInfo = await this.userService.findUserForLogin(req.user.id);
    return userInfo;
  }

  @Get('/skills')
  async getAllFields() {
    const fieldList = await this.userService.findAllFields();
    return fieldList;
  }

  @Get('/jobs')
  async getAllJobs() {
    const jobList = await this.userService.findAllJobs();
    return jobList;
  }
}

export default UserController;
