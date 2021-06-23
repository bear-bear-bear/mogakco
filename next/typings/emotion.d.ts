import '@emotion/react';

// emotion ThemeProvider를 타입스크립트에서 사용하기 위한 확장입니다.
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
