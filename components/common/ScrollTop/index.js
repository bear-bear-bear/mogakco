import React, { useCallback } from 'react';

import toScrollTop from '~/lib/toScrollTop';

import * as S from './style';

const ScrollTop = () => {
  const onClick = useCallback(() => {
    toScrollTop();
  }, []);

  return (
    <S.ScrollTop onClick={onClick}>
      <S.ChevronUp />
    </S.ScrollTop>
  );
};

export default ScrollTop;
