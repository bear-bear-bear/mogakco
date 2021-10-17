import { Theme, ThemeProvider as BaseThemeProvider } from '@emotion/react';
import media from './media';

export const theme: Theme = {
  media,
  color: {
    'black-0': '#000000',
    'black-1': '#010409',
    'white-0': '#ffffff',
    'white-1': '#fefefe',
    'gray-0': '#f0f6fc',
    'gray-1': '#c9d1d9',
    'gray-2': '#b1bac4',
    'gray-3': '#8b949e',
    'gray-4': '#6e7681',
    'gray-5': '#484f58',
    'gray-6': '#30363d',
    'gray-7': '#21262d',
    'gray-8': '#161b22',
    'gray-9': '#0d1117',
    'red-0': '#a07575',
    'red-1': '#f23f31',
    'yellow-0': '#ffd500',
    'yellow-1': '#fdc500',
    'yellow-2': '#fbb500',
    'green-0': '#e0e0de',
    'blue-0': '#00509d',
    'blue-1': '#003f88',
    'blue-2': '#00296b',
  },
};

export const ThemeProvider: React.FC = ({ children }) => {
  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>;
};
