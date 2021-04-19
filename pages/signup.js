import React from 'react';
import Header from '~/components/signup/header';
import ProgressBar from '~/components/signup/progressBar';
import Auth from '~/components/signup/auth';
import Info from '~/components/signup/info';
import Interest from '~/components/signup/interest';
import Complete from '~/components/signup/complete';
import { SignUpPageContainer } from '../components/SignUp/common/styles';

const Signup = () => {
  return (
    <SignUpPageContainer>
      <Header />
      <ProgressBar />
      <Auth />
      <Info />
      <Interest />
      <Complete />
    </SignUpPageContainer>
  );
};

export default Signup;
