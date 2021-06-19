import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { ThemeProvider } from '@emotion/react';

import * as S from './style';

// TODO: scale 해결해주세요. writen by galaxy4276
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'white' | 'yellow' | 'black' | 'blue';
  scale: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  outline: boolean;
  underline: boolean;
  loading: boolean;
}

const Button = forwardRef<HTMLButtonElement | null, Partial<IButtonProps>>(
  (
    {
      children,
      color = 'blue',
      scale = 'medium',
      fullWidth = false,
      outline = false,
      underline = false,
      loading = false,
      ...rest
    },
    ref,
  ) => {
    const theme = {
      palette: {
        white: '#ffffff',
        black: '#000000',
        yellow: '#fdc500',
        blue: '#003f88',
      },
    };

    return (
      <ThemeProvider theme={theme}>
        <S.Button
          ref={ref}
          color={color}
          scale={scale}
          fullWidth={fullWidth}
          outline={outline}
          underline={underline}
          {...rest}
        >
          {children}
          {loading && <S.Loading />}
        </S.Button>
      </ThemeProvider>
    );
  },
);

Button.displayName = 'Button';

export default Button;
