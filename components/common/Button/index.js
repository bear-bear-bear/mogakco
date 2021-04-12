import React from 'react';
import { ThemeProvider } from '@emotion/react';
import Proptypes from 'prop-types';

import * as S from './style';

const Button = React.forwardRef(
  ({ children, color, size, fullWidth, outline, underline, ...rest }, ref) => {
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
          size={size}
          fullWidth={fullWidth}
          outline={outline}
          underline={underline}
          {...rest}
        >
          {children}
        </S.Button>
      </ThemeProvider>
    );
  },
);

Button.displayName = 'Button';
Button.Proptypes = {
  children: Proptypes.node.isRequired,
  color: Proptypes.string.isRequired,
  size: Proptypes.string,
  fullWidth: Proptypes.bool,
  outline: Proptypes.bool,
  underline: Proptypes.bool,
};
Button.defaultProps = {
  color: 'blue',
  size: 'medium',
};

export default Button;
