import { css } from '@emotion/react';
import styled from '@emotion/styled';

const descSizeStyles = ({ scale }) => {
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
  color: var(--color-gray-4);

  // scale style
  ${descSizeStyles}
`;
