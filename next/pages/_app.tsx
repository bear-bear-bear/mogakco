import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import { ChakraProvider } from '@chakra-ui/react';

import GlobalStyles, { customGlobalStyles } from '@components/globalStyles';
import { Memory, memoryStore } from '@lib/apiClient';

// export const END_POINT = 'http://localhost:8001/chat';

/**
 * @url SWR Options Description https://swr.vercel.app/docs/options
 */
const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  /**
   * @desc 다른 페이지에서 로그아웃 할 시 감지하여 AccessToken 을 지워버립니다.
   */
  useEffect(() => {
    const detectLogOut = () => {
      const logOutSignal = localStorage.getItem('log-out');
      if (logOutSignal === 'true') {
        memoryStore.delete(Memory.ACCESS_TOKEN);
      }
      localStorage.removeItem('log-out');
    };

    window.addEventListener('storage', detectLogOut);
    return () => window.removeEventListener('storage', detectLogOut);
  }, []);

  /**
   * @desc 첫 렌더링 시 next/config/js 리다이렉션 라우팅을 위한 쿠키 세팅
   */
  useEffect(() => {
    if (document.cookie.includes('authorized') === false) {
      document.cookie = 'authorized=false';
      // 첫 렌더링 시엔 next.config.js에 설정한 리다이렉션 라우팅이 적용이 안되지만,
      // 리로드하면 next.config.js의 리다이렉션 조건 검사가 가능해집니다.
      router.reload();
    }
  }, [router]);

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
