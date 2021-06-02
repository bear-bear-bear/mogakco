import { css } from '@emotion/react';
import styled from '@emotion/styled';

const inputSizeStyles = ({ size }) => {
  const sizes = {
    small: {
      fontSize: '1rem',
      padding: '0.5rem 0.4rem',
    },
    medium: {
      fontSize: '1.1rem',
      padding: '0.75rem 0.66rem',
    },
  };
  const { fontSize, padding } = sizes[size];

  return css`
    font-size: ${fontSize};
    padding: ${padding};
  `;
};

export const TextInput = styled.input`
  width: 100%;

  ${inputSizeStyles}
`;
