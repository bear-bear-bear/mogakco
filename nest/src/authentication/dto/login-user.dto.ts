import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginUserDto {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  readonly email!: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  readonly password!: string;
}
