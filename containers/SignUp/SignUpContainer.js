import React from 'react';
import { SignUpPageContainer } from '~/components/SignUp/common/styles';
import Header from '~/components/SignUp/Header';
import ProgressBar from '~/components/SignUp/ProgressBar';
import Auth from '~/components/SignUp/Auth';
import Info from '~/components/SignUp/Info';
import Interest from '~/components/SignUp/Interest';
import Complete from '~/components/SignUp/Complete';

const SignUpContainer = () => {
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

export default SignUpContainer;
