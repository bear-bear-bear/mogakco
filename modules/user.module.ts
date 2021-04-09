import { Module } from '@nestjs/common';
import UserRepository from 'models/repositories/user.repository';
import UserService from 'services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserVerifyRepository from 'models/repositories/user.verify.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserVerifyRepository])],
  providers: [UserService],
  exports: [UserService],
})
class UserModule {}

export default UserModule;
