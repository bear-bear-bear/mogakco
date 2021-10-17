import '@emotion/react';

// emotion ThemeProvider를 타입스크립트에서 사용하기 위한 확장입니다.
declare module '@emotion/react' {
  export interface Theme {
    color: {
      'black-0': string;
      'black-1': string;
      'white-0': string;
      'white-1': string;
      'gray-0': string;
      'gray-1': string;
      'gray-2': string;
      'gray-3': string;
      'gray-4': string;
      'gray-5': string;
      'gray-6': string;
      'gray-7': string;
      'gray-8': string;
      'gray-9': string;
      'red-0': string;
      'red-1': string;
      'yellow-0': string;
      'yellow-1': string;
      'yellow-2': string;
      'green-0': string;
      'blue-0': string;
      'blue-1': string;
      'blue-2': string;
    };
  }
}
