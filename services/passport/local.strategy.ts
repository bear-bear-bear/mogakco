// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import AuthService from '../auth.service';

// @Injectable()
// class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super({ usernameField: 'email' });
//   }

//   public async validate(email: string, password: string): Promise<any> {
//     const user = await this.authService.validateUser(email, password);
//     console.log('user: ', user);
//     if (!user) throw new UnauthorizedException('로그인에 실패했습니다.');

//     return user;
//   }
// }

// export default LocalStrategy;
