import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomHead from '~/components/common/CustomHead';
import AuthContainer from '~/components/common/AuthContainer';
import ProgressBar from '~/components/signup/progressBar';
import Auth from '~/components/signup/auth';
import Info from '~/components/signup/info';
import Interest from '~/components/signup/interest';
import Complete from '~/components/signup/complete';
import {
  getVerifyEmailDone,
  getVerifySocialDone,
  getSaveRequiredInfoDone,
  getSaveOptionalInfoDone,
  getSignUpDone,
} from '~/redux/selectors/signup';
import { resetSignUp } from '~/redux/reducers/signup';

const pageProps = {
  title: '회원가입 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const SignUp = () => {
  const dispatch = useDispatch();
  const verifyEmailDone = useSelector(getVerifyEmailDone);
  const verifySocialDone = useSelector(getVerifySocialDone);
  const saveRequiredInfoDone = useSelector(getSaveRequiredInfoDone);
  const saveOptionalInfoDone = useSelector(getSaveOptionalInfoDone);
  const verifySignUpDone = useSelector(getSignUpDone);
  const fill = [verifyEmailDone, saveRequiredInfoDone, verifySignUpDone];

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
        {(!verifyEmailDone || !verifySocialDone) && <Auth />}
        {verifyEmailDone && !saveRequiredInfoDone && <Info />}
        {saveRequiredInfoDone && !verifySignUpDone && <Interest />}
        {saveOptionalInfoDone && verifySignUpDone && <Complete />}
      </AuthContainer>
    </>
  );
};

export default SignUp;
