import { Observable } from 'rxjs';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsNotEmpty,
  ArrayMaxSize,
  IsOptional,
} from 'class-validator';
import UserJobEntity from '@models/entities/users-job.entity';
import UserFieldEntity from '@models/entities/user-field.entity';

/** @interface Types of Data Object & Properties  */
export interface ICookieProps {
  token: string;
  domain?: string;
  path: string;
  httpOnly: boolean;
  maxAge: number;
  secure?: boolean;
}

export interface IJwtPayload {
  id: number;
  username: string;
  iat: number;
  exp: number;
}

export interface IValueProps {
  username: string;
  password: string;
  email: string;
  skills: number[] | string[] | null;
  job: number | string | null;
}

// TODO: 타입 값이 데이터와 정확한 지 점검 필요 2021-06-10
export interface JwtUserProps {
  skills: UserFieldEntity[];
  job: UserJobEntity | undefined;
  username: string;
  email: string;
  hashedRefreshToken?: string | null | undefined;
  id: number;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  deletedAt?: Date | undefined;
}

/** @typing Types of Data Object & Properties with Utilities Class */
export type RValueProps = {
  skills: number[] | null;
  job: number | null;
} & Pick<IValueProps, 'username' | 'password' | 'email'>;

/** @Middlewares Types of Middlewares ( guards, interceptors, pipes, middlewares ) */
export type GuardReturnType = boolean | Promise<boolean> | Observable<boolean>;

/** @Dto Data Transfer Object ( Class ) */
const passwordRegex = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,50}$/,
);
const nickNameRegex = new RegExp(/^[^ㄱ-ㅎ]?[가-힣a-zA-Z0-9.]{1,12}$/);
const emptyMessage = '빈 값이 올 수 없습니다.';
export class CreateUserDto {
  @IsNotEmpty({ message: emptyMessage })
  @IsString()
  @MinLength(1, { message: '닉네임은 최소 1글자 이상이어야 합니다.' })
  @MaxLength(12, { message: '닉네임은 12글자를 넘을 수 없습니다.' })
  @Matches(nickNameRegex, { message: '닉네임 형식이 맞지 않습니다.' })
  readonly username!: string;

  @IsNotEmpty({ message: emptyMessage })
  @IsString()
  @IsEmail()
  @MaxLength(50, { message: '이메일은 50글자를 넘을 수 없습니다.' })
  readonly email!: string;

  @IsNotEmpty({ message: emptyMessage })
  @IsString()
  @MaxLength(15, { message: '패스워드는 15자 이상을 넘을 수 없습니다.' })
  @Matches(passwordRegex, { message: '패스워드 형식이 맞지 않습니다.' })
  readonly password!: string;

  @IsOptional()
  @ArrayMaxSize(5, { message: '관심 분야는 5개 이상 등록 할 수 없습니다.' })
  skills!: number[] | null;

  @IsOptional()
  job!: UserJobEntity | null;
}

export class LoginUserDto {
  @IsString()
  readonly email!: string;

  @IsString()
  readonly password!: string;
  // user?: Request;
}

export class UserVerifyEmailDto {
  email!: string;

  token!: string;

  id!: number;
}
