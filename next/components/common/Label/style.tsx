import { css } from '@emotion/react';
import styled from '@emotion/styled';

const labelMarginStyles = ({ direction }) => {
  const margin = `margin-${direction}`;

  return css`
    ${margin}: 0.33rem;
  `;
};

const labelSizeStyles = ({ scale }) => {
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
  const { fontSize, lineHeight } = scales[scale];

  return css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;
};

export const Label = styled.label<{ scale: string; direction: string }>`
  display: block;
  color: var(--color-gray-4);

  ${labelSizeStyles}
  ${labelMarginStyles}
`;
