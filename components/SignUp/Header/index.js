import React from 'react';
import Link from 'next/link';
import SignUpHeader from './style';
import Logo from '~/public/assets/svg/logo.svg';
import { LinkStyles } from '../common/styles';

const Index = () => {
  return (
    <SignUpHeader>
      <Link href="/" css={LinkStyles}>
        <Logo />
      </Link>
    </SignUpHeader>
  );
};

export default Index;
