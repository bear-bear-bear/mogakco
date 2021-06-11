import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomHead from '~/components/common/CustomHead';
import AuthContainer from '~/components/common/AuthContainer';
import ProgressBar from '~/components/signup/ProgressBar';
import Start from '~/components/signup/Start';
import RequiredInfo from '~/components/signup/RequiredInfo';
import OptionalInfo from '~/components/signup/OptionalInfo';
import End from '~/components/signup/End';
import { resetSignUp } from '~/redux/reducers/signup';

const pageProps = {
  title: '회원가입 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const SignUp = () => {
  const dispatch = useDispatch();
  const verifyEmailDone = useSelector(
    ({ signup }: any) => signup.verifyEmailDone,
  );
  const verifySocialDone = useSelector(
    ({ signup }: any) => signup.verifySocialDone,
  );
  const saveRequiredInfoDone = useSelector(
    ({ signup }: any) => signup.saveRequiredInfoDone,
  );
  const saveOptionalInfoDone = useSelector(
    ({ signup }: any) => signup.saveOptionalInfoDone,
  );
  const signUpDone = useSelector(({ signup }: any) => signup.signUpDone);
  const fill = [verifyEmailDone, saveRequiredInfoDone, signUpDone];

  useEffect(() => {
    // 페이지 떠날 때 모든 state 초기화
    return () => {
      dispatch(resetSignUp());
    };
  }, [dispatch]);

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
