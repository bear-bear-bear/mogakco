import { Controller, Get } from '@nestjs/common';
import UserService from '@services/user.service';

@Controller('user')
class UserController {
  constructor(private userService: UserService) {}

  @Get('/test')
  test() {
    return 'test';
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
