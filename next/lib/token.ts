/**
 * @decs 액세스 토큰을 메모리에 저장하기 위한 Map
 */
export const memoryStorage = new Map();

/**
 * @decs 액세스 토큰을 memoryStorage에 저장할 때 사용하는 dict
 */
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const EXPIRATION = 'expiration';

const token = {
  /**
   * @decs
   * 로그인, 회원가입 성공 시의 응답 중 { accessToken, expiration }을 인자로 받아 사전 합의된 위치에 세팅.
   * 리프레쉬 토큰은 대부분의 경우에 서버단에서 쿠키에 자동으로 세팅해줌을 인지할 것
   */
  set: ({
    accessToken,
    expiration = undefined,
  }: {
    accessToken: string;
    expiration?: string;
  }) => {
    memoryStorage.set(ACCESS_TOKEN, accessToken);
    if (expiration && typeof window !== 'undefined') {
      localStorage.setItem(EXPIRATION, expiration);
    }
  },

  /**
   * @decs
   * 로그아웃과 함께 사용. 사전 합의된 위치의 액세스 토큰과 expiration을 삭제.
   * 리프레쉬 토큰은 서버단에서 쿠키에 자동으로 세팅해줌을 인지할 것
   */
  delete: () => {
    memoryStorage.delete(ACCESS_TOKEN);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(EXPIRATION);
    }
  },
} as const;

export default token;
