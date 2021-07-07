import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles, { customGlobalStyles } from '@components/globalStyles';
import { SWRConfig } from 'swr';
import { useEffect } from 'react';
import { refreshAccessTokenApi } from '@lib/fetchers';
import { Memory, memoryStore } from '@lib/apiClient';

/**
 * @url SWR Options Description https://swr.vercel.app/docs/options
 */
const App = ({ Component, pageProps }: AppProps) => {
  /**
   * @desc 다른 페이지에서 로그아웃 할 시 감지하여 AccessToken 을 지워버립니다.
   */
  useEffect(() => {
    const refreshStore = async () => {
      refreshAccessTokenApi().catch(() => {
        memoryStore.delete(Memory.ACCESS_TOKEN);
      });
    };

    window.addEventListener('storage', refreshStore);
    return () => window.removeEventListener('storage', refreshStore);
  });

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
