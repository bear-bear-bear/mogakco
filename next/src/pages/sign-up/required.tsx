import React from 'react';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';
import AuthContainer from '@components/common/AuthContainer';
import ProgressBar from '@components/sign-up/ProgressBar';
import Required from '@components/sign-up/Required';

import { pageProps } from './index';

const SignUpRequired = () => {
  const { user } = useUser({
    redirectTo: '/dashboard',
    redirectIfFound: true,
  });

  if (user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <AuthContainer progressBar={<ProgressBar fill={50} />}>
        <Required />
      </AuthContainer>
    </>
  );
};

export default SignUpRequired;
