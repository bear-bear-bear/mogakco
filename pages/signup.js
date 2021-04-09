import React from 'react';
import { useSelector } from 'react-redux';
import Header from '~/components/signup/header';
import ProgressBar from '~/components/signup/progressBar';
import Auth from '~/components/signup/auth';
import Info from '~/components/signup/info';
import Interest from '~/components/signup/interest';
import Complete from '~/components/signup/complete';
import { SignUpPageContainer } from '../components/signup/common/styles';
import { getVerifyEmailDone } from '~/redux/selectors/signup';

const Signup = () => {
  const verifyEmailDone = useSelector(getVerifyEmailDone);

  return (
    <SignUpPageContainer>
      <Header />
      <ProgressBar />
      {!verifyEmailDone && <Auth />}
      <Info />
      <Interest />
      <Complete />
    </SignUpPageContainer>
  );
};

export default Signup;
