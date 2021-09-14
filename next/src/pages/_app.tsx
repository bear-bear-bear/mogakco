import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import GlobalStyles, { customGlobalStyles } from '@globalStyles';

// export const END_POINT = 'http://localhost:8001/chat';

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
      <ChakraProvider resetCSS={false}>
        <GlobalStyles styles={customGlobalStyles} />
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
};

export default App;
