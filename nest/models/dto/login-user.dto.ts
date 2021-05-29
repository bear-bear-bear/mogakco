import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @IsNotEmpty()
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
  readonly password!: string;

  user?: Request;
}

export default LoginUserDto;
