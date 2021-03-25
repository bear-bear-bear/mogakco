import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

class createUserDTO {
  @MinLength(5, { message: '닉네임은 최소 3글자 이상이어야 합니다.' })
  @MaxLength(10, { message: '닉네임은 10글자를 넘을 수 없습니다.' })
  @IsString()
  readonly username!: string;

  @IsEmail()
  @MaxLength(50, { message: '이메일은 50글자를 넘을 수 없습니다.' })
  readonly email!: string;

  @IsString()
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
  readonly password!: string;
}

export default createUserDTO;
