import React from 'react';

import CustomHead from '@components/common/CustomHead';
import AuthContainer from '@components/common/AuthContainer';
import ProgressBar from '@components/sign-up/ProgressBar';
import Required from '@components/sign-up/Required';

import { pageProps } from './index';

const SignUpRequired = () => {
  return (
    <>
      <CustomHead {...pageProps} />
      <AuthContainer progressBar={<ProgressBar fill={33} />}>
        <Required />
      </AuthContainer>
    </>
  );
};

export default SignUpRequired;
