import { Module } from '@nestjs/common';
import UserRepository from 'models/repositories/user.repository';
import UserService from 'services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
  exports: [UserService],
})
class UserModule {}

export default UserModule;
