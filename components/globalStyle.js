import { Global, css } from '@emotion/react';

const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        font-family: sans-serif;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }

      body {
        // TODO: 추가한 폰트 적용 (bear)
        /* font-family: 'Roboto', 'HelveticaNeue', 'Helvetica Neue', sans-serif; */
      }
    `}
  />
);

export default GlobalStyle;
