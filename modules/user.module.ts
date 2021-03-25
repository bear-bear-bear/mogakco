import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepository from '../models/repositories/user.repository';
import userController from '../controllers/user.controller';
import UserService from '../services/user.service';
import AuthModule from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
  controllers: [userController],
  providers: [UserService],
  exports: [UserService],
})
class UserModule {}

export default UserModule;
