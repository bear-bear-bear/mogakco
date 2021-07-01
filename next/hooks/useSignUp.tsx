import useSWR from 'swr';

type State = {
  isVerifyEmail: boolean;
  isSaveRequiredInfo: boolean;
  isSignUpDone: boolean;
};

export const SIGN_UP_KEY = 'pages/signup';

const useSignUp = () => {
  const initialData: State = {
    isVerifyEmail: false,
    isSaveRequiredInfo: false,
    isSignUpDone: false,
  };

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
