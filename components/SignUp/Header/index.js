import Link from 'next/link';
import signUpHeader from './style';
import Logo from '~/public/assets/svg/logo.svg';
import { linkStyles } from '../common/styles';

const index = () => {
  return (
    <div css={signUpHeader}>
      <Link href="/" css={linkStyles}>
        <Logo style={{ cursor: 'pointer' }} />
      </Link>
    </div>
  );
};

export default index;
