import React from 'react';
import CustomHead from '@components/common/CustomHead';

export const pageProps = {
  title: '대시보드 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const SignIn = () => {
  return (
    <>
      <CustomHead {...pageProps} />
      <h1>대시보드 페이지입니다.</h1>
    </>
  );
};

export default SignIn;
