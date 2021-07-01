import useSWR from 'swr';

export type State = {
  userInfo: {
    email: string | null;
    username: string | null;
    password: string | null;
  };
  isVerifyEmail: boolean;
  isSaveRequiredInfo: boolean;
  isSignUpDone: boolean;
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
};

const useSignUp = () => {
  const {
    data: { isSaveRequiredInfo, isSignUpDone, isVerifyEmail } = initialData,
    mutate: updateSignUp,
  } = useSWR<State>(SIGN_UP_KEY, () => initialData);

  return {
    isSaveRequiredInfo,
    isSignUpDone,
    isVerifyEmail,
    updateSignUp,
  };
};

export default useSignUp;
