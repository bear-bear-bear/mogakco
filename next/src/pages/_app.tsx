import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import GlobalStyles from '@globalStyles';
import { ThemeProvider } from '@globalStyles/theme';

/**
 * @url SWR Options Description https://swr.vercel.app/docs/options
 */
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <SWRConfig
        value={{
          errorRetryCount: 3,
          dedupingInterval: 2000,
          errorRetryInterval: 5000,
        }}
      >
        <GlobalStyles />
        <Component {...pageProps} />
      </SWRConfig>
    </ThemeProvider>
  );
};

export default App;
