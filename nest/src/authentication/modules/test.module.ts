import { Module } from '@nestjs/common';
import TestController from '@authentication/test/test.controller';

@Module({
  controllers: [TestController],
})
export default class AuthTestModule {}
