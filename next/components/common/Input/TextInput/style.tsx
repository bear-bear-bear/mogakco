import { css } from '@emotion/react';
import styled from '@emotion/styled';

const scaleStyles = ({ scale }) => {
  const scales = {
    small: {
      fontSize: '1rem',
      padding: '0.5rem 0.4rem',
    },
    medium: {
      fontSize: '1.1rem',
      padding: '0.75rem 0.66rem',
    },
  };
  const { fontSize, padding } = scales[scale];

  return css`
    font-size: ${fontSize};
    padding: ${padding};
  `;
};

export const TextInput = styled.input`
  width: 100%;

  ${scaleStyles}
`;
