import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { VscLoading } from 'react-icons/vsc';
import { darken, lighten } from 'polished';
import { IButtonProps } from '~/components/common/Button/index';

// TODO: theme 해결해주세요. writen by galaxy4276
interface IColorStyleProps {
  theme: any;
  color: 'white' | 'black' | 'yellow' | 'blue';
  outline: boolean;
  underline: boolean;
  disabled: boolean;
}

const colorStyles = ({
  theme,
  color,
  outline,
  underline,
  disabled,
}: IColorStyleProps) => {
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
    &:hover,
    &:focus {
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
      &:hover,
      &:focus {
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
      &:hover,
      &:focus {
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

    ${disabled &&
    css`
      color: var(--color-gray-4);
      background: var(--color-gray-1);
      &:hover,
      &:focus {
        background: var(--color-gray-1);
      }
    `}
  `;
};

const sizeStyles = ({ size }: { size: 'large' | 'medium' | 'small' }) => {
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

const fullWidthStyle = ({ fullWidth }: { fullWidth: boolean }) =>
  fullWidth &&
  css`
    width: 100%;
    justify-content: center;
    &:not(:first-of-type) {
      margin-left: 0;
      margin-top: 1rem;
    }
  `;

export const Button = styled.button<IColorStyleProps & IButtonProps>`
  /* 공통 스타일 */
  min-width: ${({ loading }: { loading: boolean }) => loading && '8.1rem'};
  position: relative;
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  padding: 1.33rem;
  word-break: keep-all;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:not(:first-of-type) {
    margin-left: 0.66rem;
  }

  /* 컬러 스타일 */
  ${colorStyles}

  /* 사이즈 스타일 */
  ${sizeStyles}

  /* fullWidth */
  ${fullWidthStyle}
`;

const loadingAnimation = keyframes`
  ${'0%'} {
    transform: rotateZ(0deg);
  }

  ${'50%'} {
    transform: rotateZ(400deg);
  }

  ${'100%'} {
    transform: rotateZ(1080deg);
  }
`;

export const Loading = styled(VscLoading)`
  margin-left: 0.33rem;
  font-size: 1.1rem;
  color: ${({ color }) => (color === 'white' ? 'black' : 'white')};
  animation: ${loadingAnimation} 1.8s cubic-bezier(0.645, 0.045, 0.355, 1)
    infinite;
`;
