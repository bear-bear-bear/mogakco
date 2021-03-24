import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

class userDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  username!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}

export default userDTO;
