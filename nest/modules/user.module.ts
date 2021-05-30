import { Module } from '@nestjs/common';
import UserRepository from 'models/repositories/user.repository';
import UserService from 'services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserVerifyRepository from '@models/repositories/user.verify.repository';
import UserController from '@controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserVerifyRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
class UserModule {}

export default UserModule;
