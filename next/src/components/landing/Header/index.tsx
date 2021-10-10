import React from 'react';
import Link from 'next/link';
import { Box } from '@chakra-ui/react';
import Button from '@components/common/Button';

import * as S from './style';

const Header = () => (
  <S.HeaderContainer>
    <Box w="fit-content">
      <S.MainLogo />
    </Box>
    <Box ml="auto">
      <S.ButtonsWrapper>
        <Link href="/sign-in">
          <a>
            <Button color="black" underline>
              로그인
            </Button>
          </a>
        </Link>
        <Link href="/sign-up">
          <a>
            <Button color="black" underline>
              회원가입
            </Button>
          </a>
        </Link>
      </S.ButtonsWrapper>
    </Box>
  </S.HeaderContainer>
);

export default Header;
