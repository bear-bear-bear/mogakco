import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import GlobalStyles, { customGlobalStyles } from '@globalStyles';

/**
 * @url SWR Options Description https://swr.vercel.app/docs/options
 */
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 3,
        dedupingInterval: 2000,
        errorRetryInterval: 5000,
      }}
    >
      <GlobalStyles styles={customGlobalStyles} />
      <Component {...pageProps} />
    </SWRConfig>
  );
};

export default App;
