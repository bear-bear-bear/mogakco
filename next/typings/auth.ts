import type { IGeneralServerResponse, ErrorPayload } from '@typings/common';

// 로그인 유저 정보
export interface ILoginProps {
  email: string;
  password: string;
}

// 유저 정보
export interface IUserProps {
  id: number;
  username: string;
  skills: number[] | null;
  job: number | null;
}

// 유저 상태 타입
export interface IUserState {
  me: IUserProps | null;
  logInLoading: boolean;
  logInDone: boolean;
  logInError: ErrorPayload;
  logOutLoading: boolean;
  logOutDone: boolean;
  logOutError: ErrorPayload;
}

// 회원가입에 필요한 리덕스 state
export interface ISignUpUserReduxProps {
  email: string | null;
  username: string | null;
  password: string | null;
}

// 회원가입 요청에 필요한 정보
export interface ISignUpUserProps extends ISignUpUserReduxProps {
  skills: number[] | null;
  job: number | null;
}

// 회원가입 유저 선택정보 타입
export interface IOptionalInfoProps {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// 회원가입 페이지 상태 타입
export interface ISignUpState {
  userInfo: ISignUpUserReduxProps;
  sendEmailLoading: boolean;
  sendEmailDone: boolean;
  sendEmailError: IGeneralServerResponse | null;
  verifyEmailLoading: boolean;
  verifyEmailDone: boolean;
  verifyEmailError: IGeneralServerResponse | null;
  verifySocialLoading: boolean;
  verifySocialDone: boolean;
  verifySocialError: IGeneralServerResponse | null;
  loadSkillsLoading: boolean;
  loadSkillsDone: boolean;
  loadSkillsError: IGeneralServerResponse | null;
  loadJobsLoading: boolean;
  loadJobsDone: boolean;
  loadJobsError: IGeneralServerResponse | null;
  saveRequiredInfoDone: boolean;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: IGeneralServerResponse | null;
  skills: IOptionalInfoProps[] | null;
  jobs: IOptionalInfoProps[] | null;
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
}
