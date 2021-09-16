export const isDevelopment = process.env.NODE_ENV === 'development';
export const isTest = process.env.NODE_ENV === 'test';
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * @desc 환경과 모드에 맞는 서버 url 을 반환합니다.
 * @param mode 채팅 서버인 지, http 서버인 지 판별
 */
export const getServerUrl = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return `${process.env.NEXT_PUBLIC_LOCALHOST_SERVER_URL}`;
  }
  return `${process.env.NEXT_PUBLIC_SERVER_URL}`;
};
