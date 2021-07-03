// 로그인 요청에 필요한 정보
export interface ILoginProps {
  email: string;
  password: string;
}

// 유저가 가지고 있는 정보
export interface IUserProps {
  id: number;
  username: string;
  skills: number[] | null;
  job: number | null;
}

// 회원가입 요청에 필요한 정보
export interface ISignUpUserProps {
  email: string | null;
  username: string | null;
  password: string | null;
  skills: number[] | null;
  job: number | null;
}

// 회원가입 optional 페이지에서 서버로부터 받는 선택 옵션들의 타입
export interface IOptionalProps {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// 회원가입 성공 응답 스키마
export interface ISignUpResponse {
  statusCode: number;
  message: string;
  refreshToken: string;
}

// 로그인 성공 응답 스키마
type UserOptionalProps = { id: number; name: string };
export interface ILoginSuccessResponse extends ISignUpResponse {
  user: {
    id: number;
    username: string;
    email: string;
    skills: UserOptionalProps[];
    job: UserOptionalProps;
  };
  refreshToken: string;
  accessExpiredDate: string;
}
