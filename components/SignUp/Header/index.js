import React, { useCallback } from 'react';
import Router from 'next/router';
import SignUpHeader from './style';
import Logo from '~/public/assets/svg/logo.svg';
import { LinkStyles } from '../common/styles';

const Index = () => {
  const onClickLogo = useCallback(() => {
    Router.push('/');
  }, []);

  return (
    <SignUpHeader>
      <Logo css={LinkStyles} onClick={onClickLogo} />
    </SignUpHeader>
  );
};

export default Index;
