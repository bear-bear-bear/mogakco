import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminTest, ExpressUser, ITestController } from '@authentication/interfaces/test';
import AdminGuard from '@common/guards/admin.guard';
import { AdminTestSwagger, UserTestSwagger } from '@common/decorators/swagger/auth.decorator';
import JwtAuthGuard from '@common/guards/jwt-auth.guard';

@Controller('test')
export default class TestController implements ITestController {
  @AdminTestSwagger()
  @Get('/admin')
  @UseGuards(AdminGuard)
  adminTest(req: Express.Request): AdminTest {
    return {
      user: req.user,
      message: '어드민 접근 성공입니다.',
    };
  }

  @UserTestSwagger()
  @Get('/user')
  @UseGuards(JwtAuthGuard)
  userTest(req: Express.Request): ExpressUser {
    return {
      user: req.user,
    };
  }
}
