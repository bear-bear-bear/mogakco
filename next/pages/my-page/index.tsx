import React from 'react';
import { Flex } from '@chakra-ui/react';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';

export const pageProps = {
  title: '마이페이지 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const SignIn = () => {
  const { user } = useUser({ redirectTo: '/' });

  if (!user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <Flex
        justify="center"
        align="center"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          fontSize: '1.5rem',
        }}
      >
        <h1>[ 임시 마이페이지 입니다 ]</h1>
      </Flex>
    </>
  );
};

export default SignIn;
