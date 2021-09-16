export const isDevelopment = process.env.NODE_ENV === 'development';
export const isTest = process.env.NODE_ENV === 'test';
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * @desc 환경과 모드에 맞는 서버 url 을 반환합니다.
 * @param mode 채팅 서버인 지, http 서버인 지 판별
 */
export const getServerUrl = (mode?: 'http' | 'socket'): string => {
  console.log({
    NODE_ENV: process.env.NODE_ENV,
    TEST_SERVER_URL: process.env.NEXT_PUBLIC_TEST_SERVER_URL,
    PROD_SERVER_URL: process.env.PROD_SERVER_URL,
  });
  const route = mode === 'socket' ? '/chat' : '';
  switch (process.env.NODE_ENV) {
    case 'test':
      return `${process.env.NEXT_PUBLIC_TEST_SERVER_URL}${route}`;
    case 'production':
      return `${process.env.NEXT_PUBLIC_PROD_SERVER_URL}${route}`;
    default:
      return `http://localhost:8001${route}`;
  }
};
