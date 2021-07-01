import useSWR from 'swr';
import type { IOptionalInfoProps } from 'typings/auth';

export type State = {
  userInfo: {
    email: string | null;
    username: string | null;
    password: string | null;
  };
  isVerifyEmail: boolean;
  isSaveRequiredInfo: boolean;
  isSignUpDone: boolean;
  skills: IOptionalInfoProps[] | null; // 서버에서 받아오는 optionalInfo 페이지 데이터 정보
  jobs: IOptionalInfoProps[] | null; // 서버에서 받아오는 optionalInfo 페이지 데이터 정보
};

export const SIGN_UP_KEY = 'pages/signup';

export const initialData: State = {
  userInfo: {
    email: null,
    username: null,
    password: null,
  },
  isVerifyEmail: false,
  isSaveRequiredInfo: false,
  isSignUpDone: false,
  skills: null,
  jobs: null,
};

const useSignUp = () => {
  const {
    data: {
      userInfo,
      isSaveRequiredInfo,
      isSignUpDone,
      isVerifyEmail,
      skills,
      jobs,
    } = initialData,
    mutate: updateSignUp,
  } = useSWR<State>(SIGN_UP_KEY, () => initialData);

  return {
    userInfo,
    isSaveRequiredInfo,
    isSignUpDone,
    isVerifyEmail,
    skills,
    jobs,
    updateSignUp,
  };
};

export default useSignUp;
