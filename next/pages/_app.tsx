import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles, { customGlobalStyles } from '@components/globalStyles';
import { SWRConfig } from 'swr';
import { useEffect } from 'react';
import { memoryStorage, ACCESS_TOKEN } from '@lib/token';

// export const END_POINT = 'http://localhost:8001/chat';

/**
 * @url SWR Options Description https://swr.vercel.app/docs/options
 */
const App = ({ Component, pageProps }: AppProps) => {
  /**
   * @desc 다른 페이지에서 로그아웃 할 시 감지하여 AccessToken 을 지워버립니다.
   */
  useEffect(() => {
    const detectLogOut = () => {
      const logOutSignal = localStorage.getItem('log-out');
      if (logOutSignal === 'true') {
        memoryStorage.delete(ACCESS_TOKEN);
      }
      localStorage.removeItem('log-out');
    };

    window.addEventListener('storage', detectLogOut);
    return () => window.removeEventListener('storage', detectLogOut);
  }, []);

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
