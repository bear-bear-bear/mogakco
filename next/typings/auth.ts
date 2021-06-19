import { IGetAxiosError } from '~/typings/common';

// 유저 정보
export interface IUserProps {
  id: number;
  username: string | null;
  skills: number[] | null;
  job: number | null;
}

// 회원가입에 필요한 유저 정보
export interface ISignUpUserProps {
  email: string | null;
  username: string | null;
  password: string | null;
  skills: number[] | null;
  job: number | null;
}

// 회원가입 페이지 상태 타입
export interface ISignUpState {
  userInfo: ISignUpUserProps;
  sendEmailLoading: boolean;
  sendEmailDone: boolean;
  sendEmailError: IGetAxiosError;
  verifyEmailLoading: boolean;
  verifyEmailDone: boolean;
  verifyEmailError: IGetAxiosError;
  verifySocialLoading: boolean;
  verifySocialDone: boolean;
  verifySocialError: IGetAxiosError;
  loadSkillsLoading: boolean;
  loadSkillsDone: boolean;
  loadSkillsError: IGetAxiosError;
  loadJobsLoading: boolean;
  loadJobsDone: boolean;
  loadJobsError: IGetAxiosError;
  saveRequiredInfoDone: boolean;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: IGetAxiosError;
  skills: number[] | null;
  jobs: number | null;
}

// 회원가입 유저 선택정보 타입
export interface IOptionalInfoProps {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SimpleStringPayload = { payload: string };
