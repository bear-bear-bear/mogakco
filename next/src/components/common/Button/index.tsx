import React, { ButtonHTMLAttributes, forwardRef } from 'react';

import * as S from './style';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'white' | 'yellow' | 'black' | 'blue' | 'red';
  scale: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  outline: boolean;
  underline: boolean;
  $loading: boolean;
}

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
    );
  },
);

Button.displayName = 'Button';

export default Button;
