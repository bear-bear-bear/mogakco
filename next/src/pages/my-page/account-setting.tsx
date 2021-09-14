import React from 'react';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';
import ServiceHeader from '@components/common/ServiceHeader';
import Container from '@components/my-page/Container';
import Aside from '@components/my-page/Aside';
import AccountSetting from '@components/my-page/AccountSetting';
import type { IUserInfo } from 'typings/auth';

export const pageProps = {
  title: '마이페이지 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const MyPageAccountSetting = () => {
  // const { user } = useUser({ redirectTo: '/' });
  const { user } = useUser();

  if (!user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <ServiceHeader />
      <Container>
        <Aside />
        <AccountSetting user={user as IUserInfo} />
      </Container>
    </>
  );
};

export default MyPageAccountSetting;
