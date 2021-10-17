import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { NoUndefinedField } from 'typings/common';
import type { IProps } from './index';

type Scale = NoUndefinedField<Pick<IProps, 'scale'>>;
const descSizeStyles = ({ scale }: Scale) => {
  const scales = {
    small: {
      fontSize: '0.95rem',
      lineHeight: '1.2',
      gap: '0.8rem',
    },
    medium: {
      fontSize: '1.05rem',
      lineHeight: '1.5',
      gap: '1rem',
    },
  };
  const { fontSize, lineHeight, gap } = scales[scale];

  return css`
    font-size: ${fontSize};
    line-height: ${lineHeight};

    & + & {
      margin-top: ${gap};
    }
  `;
};

export const Desc = styled.p`
  color: ${({ theme }) => theme.color['gray-4']};

  // scale style
  ${descSizeStyles}
`;
