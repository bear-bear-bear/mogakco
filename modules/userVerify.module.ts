import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import userVerifyRepository from '../models/repositories/userVerify.repository';
import UserVerrifyService from '../services/userVerrify.service';
import UserController from '../controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([userVerifyRepository])],
  controllers: [UserController],
  providers: [UserVerrifyService],
})
class UserVerifyModule {}

export default UserVerifyModule;
