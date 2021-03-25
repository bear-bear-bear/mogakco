import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepository from '../models/repositories/user.repository';
import userController from '../controllers/user.controller';
import UserService from '../services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [userController],
  providers: [UserService],
  exports: [UserService],
})
class UserModule {}

export default UserModule;
