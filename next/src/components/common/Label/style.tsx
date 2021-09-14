import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { NoUndefinedField } from 'typings/common';
import type { IProps } from './index';

type Direction = Pick<IProps, 'direction'>;
const labelMarginStyles = ({ direction }: Direction) => {
  const margin = `margin-${direction}`;

  return css`
    ${margin}: 0.33rem;
  `;
};

type Scale = Pick<IProps, 'scale'>;
type RequiredScale = NoUndefinedField<Scale>;
const labelSizeStyles = ({ scale }: Scale) => {
  const scales = {
    small: {
      fontSize: '1.05rem',
      lineHeight: '1.1',
    },
    medium: {
      fontSize: '1.05rem',
      lineHeight: '1.3',
    },
  };
  const { fontSize, lineHeight } = scales[scale as RequiredScale['scale']];

  return css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;
};

export const Label = styled.label<IProps>`
  display: block;
  color: var(--color-gray-4);

  ${labelSizeStyles}
  ${labelMarginStyles}
`;
