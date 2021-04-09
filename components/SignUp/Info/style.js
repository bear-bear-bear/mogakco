import { css } from '@emotion/react';
import generateStyled from '~/lib/generateStyled';

const WarningTextStyles = css`
  display: block;
  color: #f23f31;
  margin: 0 auto;
  margin-bottom: 1.875rem;
`;

export const WarningText = generateStyled('span', WarningTextStyles);
