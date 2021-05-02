import React from 'react';
import { useSelector } from 'react-redux';
import Header from '~/components/SignUp/header';
import ProgressBar from '~/components/SignUp/progressBar';
import Auth from '~/components/SignUp/auth';
import Info from '~/components/SignUp/info';
import Interest from '~/components/SignUp/interest';
import Complete from '~/components/SignUp/complete';
import { SignUpPageContainer } from '../components/SignUp/common/styles';
import {
  getVerifyEmailDone,
  getVerifySocialDone,
  getVerifyInfoDone,
  getVerifyInterestDone,
  getSignUpDone,
} from '~/redux/selectors/SignUp';

const Signup = () => {
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

export default Signup;
