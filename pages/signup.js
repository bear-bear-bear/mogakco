import React from 'react';
import { useSelector } from 'react-redux';
import Header from '~/components/signup/header';
import ProgressBar from '~/components/signup/progressBar';
import Auth from '~/components/signup/auth';
import Info from '~/components/signup/info';
import Interest from '~/components/signup/interest';
import Complete from '~/components/signup/complete';
import { SignUpPageContainer } from '../components/signup/common/styles';
import {
  getVerifyEmailDone,
  getVerifySocialDone,
  getVerifyInfoDone,
  getVerifyInterestDone,
  getSignUpDone,
} from '~/redux/selectors/SignUp';

const SignUp = () => {
  const verifyEmailDone = useSelector(getVerifyEmailDone);
  const verifySocialDone = useSelector(getVerifySocialDone);
  const verifyInfoDone = useSelector(getVerifyInfoDone);
  const verifyInterestDone = useSelector(getVerifyInterestDone);
  const verifySignUpDone = useSelector(getSignUpDone);
  const fill = [verifyEmailDone, verifyInfoDone, verifySignUpDone];

  return (
    <SignUpPageContainer>
      <Header />
      <ProgressBar fill={fill} />
      {(!verifyEmailDone || !verifySocialDone) && <Auth />}
      {verifyEmailDone && !verifyInfoDone && <Info />}
      {verifyInfoDone && !verifySignUpDone && <Interest />}
      {verifyInterestDone && verifySignUpDone && <Complete />}
    </SignUpPageContainer>
  );
};

export default SignUp;
