import { forwardRef, Module } from '@nestjs/common';
import UserModule from '@models/user/user.module';
import AuthService from '@authentication/auth.service';
import AuthValidateService from '@authentication/auth-validate.service';
import JwtModule from './jwt.module';

/**
 * @desc jwt, auth module 의 공통 Dependencies 를 가지고 공유합니다.
 */
@Module({
  imports: [UserModule, forwardRef(() => JwtModule)],
  providers: [AuthService, AuthValidateService],
  exports: [AuthService, AuthValidateService, UserModule],
})
export default class SharedModule {}
