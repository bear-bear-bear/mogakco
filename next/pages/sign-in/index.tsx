import React from 'react';
// import { GetServerSideProps } from 'next';
// import log from 'loglevel';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';
import AuthContainer from '@components/common/AuthContainer';
import ProgressBar from '@components/sign-up/ProgressBar';
import SignInForm from '@components/sign-in';
// import { memoryStorage, ACCESS_TOKEN } from '@lib/token';
// import { refreshAccessTokenApiSSR } from '@lib/apis';
// import { isDevelopment } from '@lib/enviroment';

export const pageProps = {
  title: '로그인 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const SignIn = () => {
  const { user } = useUser({
    redirectTo: '/dashboard',
    redirectIfFound: true,
  });

  if (user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <AuthContainer progressBar={<ProgressBar fill={0} />}>
        <SignInForm />
      </AuthContainer>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({
//   req: { headers },
// }) => {
//   log.setLevel('DEBUG');
//   try {
//     const {
//       data: { accessToken },
//     } = await refreshAccessTokenApiSSR(headers);
//     memoryStorage.set(ACCESS_TOKEN, accessToken);
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   } catch (err) {
//     if (err.statusCode === 401) {
//       if (isDevelopment) {
//         log.debug('비로그인 상태입니다.');
//       }
//     }
//     return { props: {} };
//   }
// };

export default SignIn;
