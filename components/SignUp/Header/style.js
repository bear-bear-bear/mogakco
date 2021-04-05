import { css } from '@emotion/react';
import generateStyled from '~/lib/generateStyled';

const SignUpHeaderStyles = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 6.6875rem;
`;

const SignUpHeader = generateStyled('header', SignUpHeaderStyles);

export default SignUpHeader;
