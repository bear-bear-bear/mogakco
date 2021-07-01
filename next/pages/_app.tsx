import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import wrapper from '@redux/store/configureStore';
import GlobalStyles, { customGlobalStyles } from '@components/globalStyles';
import { SWRConfig, SWRConfiguration } from 'swr';

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

export default wrapper.withRedux(App);
