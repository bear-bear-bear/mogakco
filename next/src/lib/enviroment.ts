const { NODE_ENV, TEST_SERVER_URL, PROD_SERVER_URL } = process.env;

/**
 * @desc 환경과 모드에 맞는 서버 url 을 반환합니다.
 * @param mode 채팅 서버인 지, http 서버인 지 판별
 */
export const getServerUrl = (mode?: 'http' | 'socket'): string => {
  const route = mode === 'socket' ? '/chat' : '';
  switch (NODE_ENV) {
    case 'test':
      return `${TEST_SERVER_URL}${route}`;
    case 'production':
      return `${PROD_SERVER_URL}${route}`;
    default:
      return `http://localhost:8001${route}`;
  }
};
