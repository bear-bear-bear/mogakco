import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepository from '../models/repositories/user.repository';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import UserJobRepository from '../models/repositories/ user-job.reposity';
import UserFieldRepository from '../models/repositories/user-field.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserJobRepository, UserFieldRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
class UserModule {}

export default UserModule;
