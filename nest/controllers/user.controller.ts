import { Controller, Get } from '@nestjs/common';

@Controller('user')
class UserController {
  @Get('/test')
  test() {
    return 'test';
  }
}

export default UserController;
