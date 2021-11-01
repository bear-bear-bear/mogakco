import React from 'react';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';
import ServiceHeader from '@components/common/ServiceHeader';
import Container from '@components/my-page/common/Container';
import Aside from '@components/my-page/common/Aside';
import TempMain from '@components/my-page/TempMain';

export const pageProps = {
  title: '마이페이지 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const MyPageTodo = () => {
  // const { user } = useUser({ redirectTo: '/' });
  const { user } = useUser();

  if (!user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <ServiceHeader />
      <Container>
        <Aside />
        <TempMain />
      </Container>
    </>
  );
};

export default MyPageTodo;
