import React from 'react';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';
import ServiceHeader from '@components/common/ServiceHeader';
import Container from '@components/my-page/common/Container';
import Aside from '@components/my-page/common/Aside';
import AccountSetting from '@components/my-page/AccountSetting';
import { getServerSideProps as _getServerSideProps } from '@pages/sign-up/optional';
import type { IOptionalPageProps as SelectsOptions } from '@pages/sign-up/optional';
import type { IUserInfo } from 'typings/auth';

export const pageProps = {
  title: '마이페이지 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const MyPageAccountSetting = (props: SelectsOptions) => {
  const { user, mutateUser } = useUser({ redirectTo: '/' });

  if (!user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <ServiceHeader />
      <Container>
        <Aside />
        <AccountSetting
          user={user as IUserInfo}
          mutateUser={mutateUser}
          {...props}
        />
      </Container>
    </>
  );
};

export const getServerSideProps = _getServerSideProps;

export default MyPageAccountSetting;
