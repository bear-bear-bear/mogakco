import { Controller } from '@nestjs/common';

@Controller('user')
class UserController {
  test() {
    return 'test';
  }
}

export default UserController;
