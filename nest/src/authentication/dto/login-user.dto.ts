import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginUserDto {
  @ApiProperty({ description: '이메일', example: 'mogakco35@gmail.com' })
  @IsEmail()
  readonly email!: string;

  @ApiProperty({ description: '비밀번호', example: 'mogapass' })
  @IsString()
  readonly password!: string;
}
