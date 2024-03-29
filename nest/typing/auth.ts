import { Observable } from 'rxjs';
import UserJobEntity from '@models/user/entities/users-job.entity';
import UserFieldEntity from '@models/user/entities/user-field.entity';

/** @interface Types of Data Object & Properties  */
export interface ICookieProps {
  token: string;
  domain?: string;
  path: string;
  httpOnly: boolean;
  maxAge: number;
  secure?: boolean;
  sameSite?: boolean | 'lax' | 'none' | 'strict' | undefined;
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
  skills: UserFieldEntity[] | null;
  job: UserJobEntity | null;
  username: string;
  email: string;
  hashedRefreshToken?: string | null | undefined;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

/** @typing Types of Data Object & Properties with Utilities Class */
export type RValueProps = {
  skills: number[] | null;
  job: number | null;
} & Pick<IValueProps, 'username' | 'password' | 'email'>;

/** @Middlewares Types of Middlewares ( guards, interceptors, pipes, middlewares ) */
export type GuardReturnType = boolean | Promise<boolean> | Observable<boolean>;

export class UserVerifyEmailDto {
  email!: string;

  token!: string;

  id!: number;
}
