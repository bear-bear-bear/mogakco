import useSWR from 'swr';

export type State = {
  isVerifyEmail: boolean;
  isSaveRequiredInfo: boolean;
  isSignUpDone: boolean;
};

export const SIGN_UP_KEY = 'pages/signup';

export const initialData: State = {
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
