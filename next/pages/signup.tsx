import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CustomHead from '~/components/common/CustomHead';
import AuthContainer from '~/components/common/AuthContainer';
import ProgressBar from '~/components/signup/ProgressBar';
import Start from '~/components/signup/Start';
import RequiredInfo from '~/components/signup/RequiredInfo';
import OptionalInfo from '~/components/signup/OptionalInfo';
import End from '~/components/signup/End';
import { resetSignUp } from '~/redux/reducers/signup';
import useAppSelector from '~/hooks/useAppSelector';

const pageProps = {
  title: '회원가입 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const SignUp = () => {
  const dispatch = useDispatch();
  const verifyEmailDone = useAppSelector(
    ({ signup }) => signup.verifyEmailDone,
  );
  const verifySocialDone = useAppSelector(
    ({ signup }) => signup.verifySocialDone,
  );
  const saveRequiredInfoDone = useAppSelector(
    ({ signup }) => signup.saveRequiredInfoDone,
  );
  const saveOptionalInfoDone = useAppSelector(
    ({ signup }) => signup.saveOptionalInfoDone,
  );
  const signUpDone = useAppSelector(({ signup }) => signup.signUpDone);
  const fill = [verifyEmailDone, saveRequiredInfoDone, signUpDone];

  useEffect(() => {
    // 페이지 떠날 때 모든 state 초기화
    return () => {
      dispatch(resetSignUp());
    };
  }, [dispatch]);

  console.log({ saveOptionalInfoDone });
  return (
    <>
      <CustomHead {...pageProps} />
      <AuthContainer progressBar={<ProgressBar fill={fill} />}>
        {(!verifyEmailDone || !verifySocialDone) && <Start />}
        {verifyEmailDone && !saveRequiredInfoDone && <RequiredInfo />}
        {saveRequiredInfoDone && !signUpDone && <OptionalInfo />}
        {saveOptionalInfoDone && signUpDone && <End />}
      </AuthContainer>
    </>
  );
};

export default SignUp;
