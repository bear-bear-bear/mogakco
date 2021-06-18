// 유저 정보
export interface IUserProps {
  id: number;
  username: string | null;
  skills: any | null;
  job: string | null;
}

// 회원가입에 필요한 유저 정보
export interface ISignUpUserProps {
  email: string | null;
  username: string | null;
  password: string | null;
  skills: string | null;
  job: string | null;
}

// 회원가입 페이지 상태 타입
export interface ISignUpState {
  userInfo: ISignUpUserProps;
  sendEmailLoading: boolean;
  sendEmailDone: boolean;
  sendEmailError: string | null;
  verifyEmailLoading: boolean;
  verifyEmailDone: boolean;
  verifyEmailError: any;
  verifySocialLoading: boolean;
  verifySocialDone: boolean;
  verifySocialError: any;
  loadSkillsLoading: boolean;
  loadSkillsDone: boolean;
  loadSkillsError: any;
  loadJobsLoading: boolean;
  loadJobsDone: boolean;
  loadJobsError: any;
  saveRequiredInfoDone: boolean;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: any;
  skills: number[];
  jobs: string;
}

// 회원가입 유저 선택정보 타입
export interface IOptionalInfoProps {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}