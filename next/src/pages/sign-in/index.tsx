import React from 'react';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';
import AuthContainer from '@components/common/AuthContainer';
import ProgressBar from '@components/sign-up/ProgressBar';
import SignInForm from '@components/sign-in';

export const pageProps = {
  title: '로그인 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const SignIn = () => {
  const { user, mutateUser } = useUser({
    redirectTo: '/lobby',
    redirectIfFound: true,
  });

  if (user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <AuthContainer progressBar={<ProgressBar fill={0} />}>
        <SignInForm mutateUser={mutateUser} />
      </AuthContainer>
    </>
  );
};

export default SignIn;
