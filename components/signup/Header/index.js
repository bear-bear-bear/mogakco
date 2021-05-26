import React, { useCallback } from 'react';
import Router from 'next/router';

import Image from '~/components/common/Image';
import * as S from './style';

const Index = () => {
  const onClickLogo = useCallback(() => {
    Router.push('/');
  }, []);

  return (
    <S.SignUpHeader>
      <S.LogoWrapper onClick={onClickLogo}>
        <Image name="logo.svg" />
      </S.LogoWrapper>
    </S.SignUpHeader>
  );
};

export default Index;
