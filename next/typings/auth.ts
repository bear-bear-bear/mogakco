import { IGeneralServerResponse } from '~/typings/common';

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
  // skills: number[] | null;
  // job: number | null;
}

// 회원가입 유저 선택정보 타입
export interface IOptionalInfoProp {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// 회원가입 페이지 상태 타입
export interface ISignUpState {
  userInfo: ISignUpUserProps;
  sendEmailLoading: boolean;
  sendEmailDone: boolean;
  sendEmailError: IGeneralServerResponse;
  verifyEmailLoading: boolean;
  verifyEmailDone: boolean;
  verifyEmailError: IGeneralServerResponse;
  verifySocialLoading: boolean;
  verifySocialDone: boolean;
  verifySocialError: IGeneralServerResponse;
  loadSkillsLoading: boolean;
  loadSkillsDone: boolean;
  loadSkillsError: IGeneralServerResponse;
  loadJobsLoading: boolean;
  loadJobsDone: boolean;
  loadJobsError: IGeneralServerResponse;
  saveRequiredInfoDone: boolean;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: IGeneralServerResponse;
  skills: IOptionalInfoProp[];
  jobs: IOptionalInfoProp[];
}
