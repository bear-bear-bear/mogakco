import { IsEmail, IsString } from 'class-validator';

class createUserDTO {
  @IsString()
  readonly username!: string;

  @IsEmail()
  readonly email!: string;

  @IsString()
  readonly password!: string;
}

export default createUserDTO;
