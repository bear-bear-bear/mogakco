import React from 'react';
import Link from 'next/link';
import { Box, Flex } from '@chakra-ui/react';

import Button from '~/components/common/Button';

import * as S from './style';

// TODO: 로그인/로그아웃 컴포넌트 작은 모니터에서 버거로 변경

const Header = () => (
  <S.HeaderContainer>
    <Flex justify="space-between">
      <Box w="fit-content">
        <S.MainLogo />
      </Box>
      <Box w="auto">
        <S.ButtonsWrapper>
          <Link href="/login">
            <Button color="black" underline>
              로그인
            </Button>
          </Link>
          <Link href="/signup">
            <Button color="black" underline>
              회원가입
            </Button>
          </Link>
        </S.ButtonsWrapper>
      </Box>
    </Flex>
  </S.HeaderContainer>
);

export default Header;
