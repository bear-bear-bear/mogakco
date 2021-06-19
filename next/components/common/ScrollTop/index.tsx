import React, { FC } from 'react';

import scrollToTop from '~/lib/scrollToTop';

import * as S from './style';

const ScrollTop: FC = () => (
  <S.ScrollTop onClick={() => scrollToTop()}>
    <S.ChevronUp />
  </S.ScrollTop>
);

export default ScrollTop;
