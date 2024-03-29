import axios, { AxiosRequestConfig } from 'axios';
import log from 'loglevel';

import devModeLog from '@lib/devModeLog';
import { refreshAccessTokenApi } from '@lib/apis';
import token, { REFRESH_TOKEN } from '@lib/token';
import { getServerUrl } from '@lib/enviroment';
import type { GeneralAxiosError } from 'typings/common';

// TODO:  모달 적용을 위해 hooks로 만들기
export const logAxiosError = (axiosError: GeneralAxiosError) => {
  if (process.env.NODE_ENV === 'production') {
    log.setLevel('trace');
    log.trace('배포 모드에선 로그를 표시하지 않습니다.');
    return;
  }

  log.setLevel('debug');

  if (!axiosError.isAxiosError) {
    log.warn(
      'axios 에러가 아닙니다. logAxiosError 는 axios 에러만을 로깅합니다.',
    );
    log.error(axiosError);
    return;
  }

  const { response, request, message, config } = axiosError;
  if (response) {
    const { data, headers } = response;
    log.error(
      '요청이 이루어졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.',
    );
    log.debug('Response');
    log.debug(' ㄴHeaders:', headers);
    log.debug(' ㄴError:', data.error);
    if (data.message) {
      log.debug(' ㄴMessage:', data.message);
    }
  } else if (request) {
    log.error('요청이 이루어 졌으나 응답을 받지 못했습니다.');
    log.debug('Request:', request);
  } else {
    log.error('오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.');
    log.debug('Error message:', message);
  }

  log.debug('Axios config:', config);
};

/**
 * @desc api 요청 클라이언트
 */

const apiClient = axios.create({
  baseURL: getServerUrl(),
  withCredentials: true,
});

const passUrlDict = {
  ACCESS_TOKEN_REFRESH: '/api/auth/refresh-token',
  SIGN_UP: '/api/auth',
  SIGN_IN: '/api/auth/login',
  SIGN_OUT: '/api/auth/logout',
  LOAD_SKILLS: '/api/user/skills',
  LOAD_JOBS: '/api/user/jobs',
  SEND_EMAIL: '/api/auth/is-verified/before-register',
};
type PassUrl = keyof typeof passUrlDict;

/**
 * @desc
 * accessToken을 새로 발급받아 new expiration은 로컬 스토리지에,
 * new accessToken은 memoryStorage와 config.headers.Authorization에 각각 세팅
 * @returns headers.Authorization에 refreshed new AccessToken이 세팅된 AxiosRequestConfig
 */
export const refreshAccessToken = async (config: AxiosRequestConfig) => {
  devModeLog('토큰을 갱신합니다');
  try {
    const {
      data: { accessToken: newAccessToken, expiration: newExpiration },
    } = await refreshAccessTokenApi();
    token.set({
      accessToken: newAccessToken,
      expiration: newExpiration,
    });
    config.headers.Authorization = `Bearer ${newAccessToken}`;
    devModeLog('토큰 갱신 성공');
    return config;
  } catch (err) {
    devModeLog('토큰 갱신 실패');
    // logAxiosError(err as GeneralAxiosError);
    const { response } = err as GeneralAxiosError;
    if (response?.status === 401) {
      devModeLog('401 UnAuthorized - 기존 토큰 정보를 삭제합니다');
      // 401일땐 로그아웃 처리 (다른 탭과 동기화)
      // refresh토큰 또한 직접 삭제 (서버단에선 로그아웃 요청시에만 refresh 토큰을 삭제해줌)
      token.delete();
      document.cookie = `${REFRESH_TOKEN}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    }
    return config;
  }
};

const processProlongToken = async (config: AxiosRequestConfig) => {
  if (typeof window === 'undefined') return config;

  if (!token.isRefreshTokenInCookie()) return config;

  // 인터셉트를 패스시켜야 할 url인지 검사
  const passUrlList = Object.values(passUrlDict);
  if (passUrlList.includes(config.url as string)) {
    const urlNames = Object.keys(passUrlDict) as PassUrl[];
    const currUrlName = urlNames.find((key) => passUrlDict[key] === config.url);
    devModeLog(`인터셉터 요청을 패스합니다. (${currUrlName})`);
    return config;
  }

  // 패스할 url이 아니라면 사용자가 기존에 가지고 있던 accessToken의 유효성 검사 시작 (검사 실패 시 refresh)
  // 검사 1. 로컬 스토리지 내 access-token 만료기한 유무 검사
  const { accessToken, expiration } = token.get();
  if (expiration === null) {
    const settedNewTokenReqConfig = await refreshAccessToken(config);
    return settedNewTokenReqConfig;
  }

  // 검사 2. 액세스 토큰 만료 기한 유효성 검사
  const nowDate = new Date();
  const expirationDate = new Date(expiration);
  if (nowDate > expirationDate) {
    const settedNewTokenReqConfig = await refreshAccessToken(config);
    return settedNewTokenReqConfig;
  }

  // 검사 3. 브라우저 리다이렉션 또는 외부요인으로 인해 액세스 토큰이 소실 되었는지 검사
  if (accessToken === undefined) {
    const settedNewTokenReqConfig = await refreshAccessToken(config);
    return settedNewTokenReqConfig;
  }

  // 검사를 모두 통과했다면 기존 토큰을 req 헤더에 세팅
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

apiClient.interceptors.request.use(processProlongToken);

export default apiClient;
