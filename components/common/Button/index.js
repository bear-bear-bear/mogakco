import React from 'react';
import { ThemeProvider } from '@emotion/react';

import * as S from './style';

const Button = React.forwardRef(
  ({ children, color, outline, underline, ...rest }, ref) => {
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

Button.defaultProps = {
  color: 'blue',
  size: 'medium',
};

export default Button;
