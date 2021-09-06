import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepository from '@models/user/repositories/user.repository';
import UserJobRepository from '@models/user/repositories/ user-job.reposity';
import UserFieldRepository from '@models/user/repositories/user-field.repository';
import UserService from './user.service';
import UserController from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserJobRepository, UserFieldRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
class UserModule {}

export default UserModule;
