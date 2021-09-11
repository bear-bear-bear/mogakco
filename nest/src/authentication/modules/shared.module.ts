import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserVerifyRepository from '@models/user/repositories/user-verify.repository';
import UserRepository from '@models/user/repositories/user.repository';
import UserJobRepository from '@models/user/repositories/ user-job.reposity';
import UserModule from '@models/user/user.module';
import AuthService from '@authentication/auth.service';
import AuthValidateService from '@authentication/auth-validate.service';
import JwtModule from './jwt.module';

/**
 * @desc jwt, auth module 의 공통 Dependencies 를 가지고 공유합니다.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([UserVerifyRepository, UserRepository, UserJobRepository]),
    UserModule,
    forwardRef(() => JwtModule),
  ],
  providers: [AuthService, AuthValidateService],
  exports: [AuthService, AuthValidateService, TypeOrmModule, UserModule],
})
export default class SharedModule {}
