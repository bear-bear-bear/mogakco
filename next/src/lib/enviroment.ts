export const isDevelopment = process.env.NODE_ENV === 'development';
export const isTest = process.env.NODE_ENV === 'test';
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * @desc 환경과 모드에 맞는 서버 url 을 반환합니다.
 * @param mode 채팅 서버인 지, http 서버인 지 판별
 */
export const getServerUrl = (mode?: 'http' | 'socket'): string => {
  if (mode === 'socket') {
    if (isTest) {
      const url = process.env.TEST_SERVER_URL as string;
      return `${url}/chat`;
    }
    if (isProduction) {
      const url = process.env.PROD_SERVER_URL as string;
      return `${url}/chat`;
    }
    return 'http://localhost:8001/chat';
  }

  if (mode === 'http') {
    if (isTest) {
      return process.env.TEST_SERVER_URL as string;
    }
    if (isProduction) {
      return process.env.PROD_SERVER_URL as string;
    }
    return 'http://localhost:8001';
  }
  return 'http://localhost:8001';
};
