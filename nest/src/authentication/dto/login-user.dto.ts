import { IsEmail, IsString } from 'class-validator';

export default class LoginUserDto {
  @IsEmail()
  readonly email!: string;

  @IsString()
  readonly password!: string;
}
