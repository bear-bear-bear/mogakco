import React from 'react';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';
import ServiceHeader from '@components/common/ServiceHeader';
import Container from '@components/my-page/Container';
import Aside from '@components/my-page/Aside';
import Main from '@components/my-page/Main';

export const pageProps = {
  title: '마이페이지 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const MyPageAccountSetting = () => {
  const { user } = useUser({ redirectTo: '/' });

  if (!user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <ServiceHeader />
      <Container>
        <Aside />
        <Main />
      </Container>
    </>
  );
};

export default MyPageAccountSetting;