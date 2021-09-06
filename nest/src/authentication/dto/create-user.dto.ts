import {
  ArrayMaxSize,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import UserJobEntity from '@models/user/entities/users-job.entity';
import { ApiProperty } from '@nestjs/swagger';

const passwordRegex = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,50}$/,
);
const nickNameRegex = new RegExp(/^[^ㄱ-ㅎ]?[가-힣a-zA-Z0-9.]{1,12}$/);
const emptyMessage = '빈 값이 올 수 없습니다.';

export default class CreateUserDto {
  @ApiProperty({ description: '닉네임' })
  @IsNotEmpty({ message: emptyMessage })
  @IsString()
  @MinLength(1, { message: '닉네임은 최소 1글자 이상이어야 합니다.' })
  @MaxLength(12, { message: '닉네임은 12글자를 넘을 수 없습니다.' })
  @Matches(nickNameRegex, { message: '닉네임 형식이 맞지 않습니다.' })
  readonly username!: string;

  @ApiProperty({ description: '이메일' })
  @IsNotEmpty({ message: emptyMessage })
  @IsString()
  @IsEmail()
  @MaxLength(50, { message: '이메일은 50글자를 넘을 수 없습니다.' })
  readonly email!: string;

  @ApiProperty({ description: '패스워드' })
  @IsNotEmpty({ message: emptyMessage })
  @IsString()
  @MaxLength(15, { message: '패스워드는 15자 이상을 넘을 수 없습니다.' })
  @Matches(passwordRegex, { message: '패스워드 형식이 맞지 않습니다.' })
  readonly password!: string;

  @ApiProperty({ description: '관심 분야 ( 최대 5개 )' })
  @IsOptional()
  @ArrayMaxSize(5, { message: '관심 분야는 5개 이상 등록 할 수 없습니다.' })
  skills!: number[] | null;

  @ApiProperty({ description: '직업' })
  @IsOptional()
  job!: UserJobEntity | null;
}
