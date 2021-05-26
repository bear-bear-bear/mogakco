import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { darken, lighten } from 'polished';

const colorStyles = ({ theme, color, outline, underline }) => {
  const mainColor = theme.palette[color];
  const subColors = {
    white: '#000',
    black: '#fff',
    yellow: '#000',
    blue: '#fff',
  };
  const subColor = subColors[color];

  return css`
    color: ${subColor};
    background: ${mainColor};
    &:hover {
      background: ${darken(0.1, mainColor)};
    }
    &:active {
      background: ${lighten(0.1, mainColor)};
    }

    ${outline &&
    css`
      color: ${mainColor};
      background: none;
      border: 1px solid ${mainColor};
      &:hover {
        background: ${mainColor};
        color: ${subColor};
      }
    `}

    ${underline &&
    css`
      color: ${mainColor};
      background: none;
      border: none;
      border-radius: none;
      &:hover {
        background: none;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-bottom: 1px solid ${mainColor};
        }
      }
    `}
  `;
};

const sizeStyles = ({ size }) => {
  const sizes = {
    large: {
      height: '2.25rem',
      fontSize: '1.25rem',
    },
    medium: {
      height: '2rem',
      fontSize: '1rem',
    },
    small: {
      height: '1.5rem',
      fontSize: '0.875rem',
    },
  };
  const { height, fontSize } = sizes[size];

  return css`
    height: ${height};
    font-size: ${fontSize};
  `;
};

const fullWidthStyle = ({ fullWidth }) =>
  fullWidth &&
  css`
    width: 100%;
    justify-content: center;
    &:not(:first-of-type) {
      margin-left: 0;
      margin-top: 1rem;
    }
  `;

export const Button = styled.button`
  /* 공통 스타일 */
  position: relative;
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  padding: 1.33rem;

  /* 컬러 스타일 */
  ${colorStyles}

  /* 사이즈 스타일*/
  ${sizeStyles}

  &:not(:first-of-type) {
    margin-left: 0.66rem;
  }

  /* fullWidth */
  ${fullWidthStyle}
`;
