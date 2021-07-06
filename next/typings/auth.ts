type Response = {
  statusCode: number;
  message: string;
};

// 로그인 요청에 필요한 정보
export interface ILoginProps {
  email: string;
  password: string;
}

// 회원가입 요청에 필요한 정보
export interface ISignUpUserProps {
  email: string | null;
  username: string | null;
  password: string | null;
  skills: number[] | null;
  job: number | null;
}

// 유저가 가지고 있는 정보
// TODO: null 수정 코멘트 확인하시면 지워주세요.
export interface IUserProps {
  id: number;
  username: string;
  email: string;
  skills: UserOptionalProps[] | null; // skills 는 null 이 올 수 있습니다. ( 설정 X 시 )
  job: UserOptionalProps | null; // job 은 null 이 올 수 있습니다. ( 설정 X 시 )
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
  user: IUserProps;
  accessToken: string;
  accessExpiredDate: string;
}

// accessToken 연장 성공 응답 스키마
export interface IProlongTokenProps extends Response {
  user: IUserProps;
  accessToken: string;
  expirationTime: string;
}
