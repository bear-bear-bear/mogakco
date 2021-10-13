import React from 'react';
import Link from 'next/link';
import Button from '@components/common/Button';

import * as S from './style';

const Header = () => (
  <S.Container>
    <S.MainLogo />
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
          <Button color="blue">회원가입</Button>
        </a>
      </Link>
    </S.ButtonsWrapper>
  </S.Container>
);

export default Header;
