import React from 'react';
import Link from 'next/link';
import TextLogo from '@public/svg/logo1.svg';
import Profile from '@components/common/Profile';

import * as S from './style';

/**
 * @decs 로그인 상태에서 이용 가능한 페이지에서 사용하는 헤더입니다.
 */
const ServiceHeader = () => (
  <S.ServiceHeader>
    <Link href="/lobby">
      <a>
        <TextLogo />
      </a>
    </Link>
    <Profile modalDirection="left" />
  </S.ServiceHeader>
);

export default ServiceHeader;
