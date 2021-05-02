import React from 'react';

import toScrollTop from '~/lib/toScrollTop';

import * as S from './style';

const ScrollTop = () => (
  <S.ScrollTop onClick={() => toScrollTop()}>
    <S.ChevronUp />
  </S.ScrollTop>
);

export default ScrollTop;
