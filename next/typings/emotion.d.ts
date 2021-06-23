import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      white: string;
      black: string;
      yellow: string;
      blue: string;
    };
  }
}
