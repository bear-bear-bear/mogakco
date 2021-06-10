import React from 'react';

import scrollToTop from '~/lib/scrollToTop';

import * as S from './style';

const ScrollTop = ({ verticalAlign, horizonAlign }: any) => (
  <S.ScrollTop onClick={() => scrollToTop()}>
    <S.ChevronUp />
  </S.ScrollTop>
);

export default ScrollTop;
