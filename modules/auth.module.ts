// Deprecated Module
// Use UserModule Instead.

// import { forwardRef, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtService } from '@nestjs/jwt';
// import UserRepository from '../models/repositories/user.repository';
// import userController from '../controllers/user.controller';
// import UserService from '../services/user.service';
// import AuthModule from './auth.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([UserRepository]),
//     forwardRef(() => AuthModule),
//   ],
//   controllers: [userController],
//   providers: [UserService, JwtService],
//   exports: [UserService],
// })
// class UserModule {}

// export default UserModule;
