import React from 'react';
import { Box } from '@chakra-ui/react';

import AuthButtons from '@components/landing/Header/AuthButtons';
import { Props } from '@pages/index';

import * as S from './style';

// TODO: 로그인/로그아웃 컴포넌트 작은 모니터에서 버거로 변경

const Header = (props: Props) => (
  <S.HeaderContainer>
    <Box w="fit-content">
      <S.MainLogo />
    </Box>
    <Box ml="auto">
      <AuthButtons {...props} />
    </Box>
  </S.HeaderContainer>
);

export default Header;
