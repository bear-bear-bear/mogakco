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
  getVerifyInfoDone,
  getVerifyInterestDone,
} from '~/redux/selectors/signup';

const Signup = () => {
  const verifyEmailDone = useSelector(getVerifyEmailDone);
  const verifyInfoDone = useSelector(getVerifyInfoDone);
  const verifyInterestDone = useSelector(getVerifyInterestDone);

  return (
    <SignUpPageContainer>
      <Header />
      <ProgressBar />
      {!verifyEmailDone && <Auth />}
      {verifyEmailDone && !verifyInfoDone && <Info />}
      {verifyInfoDone && !verifyInterestDone && <Interest />}
      {verifyInterestDone && <Complete />}
    </SignUpPageContainer>
  );
};

export default Signup;
