import React from 'react';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';
import Header from '@components/my-page/Header';
import Container from '@components/my-page/Container';
import Aside from '@components/my-page/Aside';
import Main from '@components/my-page/Main';

export const pageProps = {
  title: '마이페이지 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const MyPageCalendar = () => {
  const { user } = useUser({ redirectTo: '/' });

  if (!user) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <Container>
        <Header />
        <Aside />
        <Main />
      </Container>
    </>
  );
};

export default MyPageCalendar;
