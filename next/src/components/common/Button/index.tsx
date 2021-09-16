import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { ThemeProvider } from '@emotion/react';

import * as S from './style';

export interface Theme {
  palette: Record<IButtonProps['color'], string>;
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'white' | 'yellow' | 'black' | 'blue' | 'red';
  scale: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  outline: boolean;
  underline: boolean;
  $loading: boolean;
  theme?: Theme;
}

const theme: Theme = {
  palette: {
    white: '#ffffff',
    black: '#000000',
    yellow: '#fdc500',
    blue: '#003f88',
    red: '#f23f31',
  },
};

const Button = forwardRef<HTMLButtonElement, Partial<IButtonProps>>(
  (
    {
      children,
      color = 'blue',
      scale = 'medium',
      fullWidth = false,
      outline = false,
      underline = false,
      $loading = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <ThemeProvider theme={theme}>
        <S.Button
          ref={ref}
          color={color}
          scale={scale}
          fullWidth={fullWidth}
          outline={outline}
          underline={underline}
          $loading={$loading}
          {...rest}
        >
          {children}
          {$loading && <S.Loading />}
        </S.Button>
      </ThemeProvider>
    );
  },
);

Button.displayName = 'Button';

export default Button;
