import React from 'react';
import Link from 'next/link';
import TextLogo from '@assets/svg/logo1.svg';
import Profile from '@components/common/Profile';

import * as S from './style';

const Header = () => (
  <S.Header>
    <Link href="/dashboard">
      <a>
        <TextLogo />
      </a>
    </Link>
    <Profile modalDirection="left" />
  </S.Header>
);

export default Header;
