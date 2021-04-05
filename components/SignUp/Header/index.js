import { useMemo } from 'react';
import Link from 'next/link';
import SignUpHeader from './style';
import Logo from '~/public/assets/svg/logo.svg';
import { LinkStyles } from '../common/styles';

const Index = () => {
  const pointer = useMemo(() => ({ cursor: 'pointer' }), []);
  return (
    <SignUpHeader>
      <Link href="/" css={LinkStyles}>
        <Logo style={pointer} />
      </Link>
    </SignUpHeader>
  );
};

export default Index;
