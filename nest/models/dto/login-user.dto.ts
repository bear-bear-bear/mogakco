import { IsString } from 'class-validator';

class LoginUserDto {
  @IsString()
  readonly email!: string;

  @IsString()
  readonly password!: string;
  // user?: Request;
}

export default LoginUserDto;
