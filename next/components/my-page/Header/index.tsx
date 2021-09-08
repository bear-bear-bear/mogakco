import React from 'react';
import Link from 'next/link';
import Logo from '@assets/svg/logo1.svg';

import * as S from './style';

const Header = () => (
  <S.Header>
    <Link href="/dashboard">
      <a>
        <Logo />
      </a>
    </Link>
  </S.Header>
);

export default Header;
