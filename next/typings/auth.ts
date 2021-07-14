type Response = {
  statusCode: number;
  message: string;
};

// 로그인 요청에 필요한 정보
export interface ISignInProps {
  email: string;
  password: string;
}

// 회원가입 요청에 필요한 정보
export interface ISignUpProps {
  email: string;
  username: string;
  password: string;
  skills: number[] | null;
  job: number | null;
}

// 회원가입/로그인 성공 응답 스키마
export interface IAuthSuccessResponse {
  statusCode: number;
  message: string;
  accessToken: string;
  expiration: string;
  user: IUserProps;
}

// 유저가 가지고 있는 정보
export interface IUserProps {
  id: number;
  username: string;
  email: string;
  skills: IOptionalProps[] | null;
  job: IOptionalProps | null;
}

// accessToken 연장 성공 응답 스키마
export interface IProlongTokenProps extends Response {
  user: IUserProps;
  accessToken: string;
  expiration: string;
}

// 회원가입 optional 페이지에서 서버로부터 받는 선택 옵션들의 타입
export interface IOptionalProps {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
