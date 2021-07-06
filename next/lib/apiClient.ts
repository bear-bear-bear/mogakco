import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import log from 'loglevel';
import type { IGeneralServerResponse } from 'typings/common';
import { refreshAccessTokenApi } from '@lib/fetchers';
import { isDevelopment } from '@lib/enviroment';

export const memoryStore = new Map();

export enum Memory {
  ACCESS_TOKEN = 'accessToken',
}

export type Error = AxiosError<IGeneralServerResponse>;

export const logAxiosError = (axiosError: Error) => {
  if (process.env.NODE_ENV === 'production') {
    log.setLevel('trace');
    log.trace('배포 모드에선 로그를 표시하지 않습니다.');
  }

  log.setLevel('debug');

  if (!axiosError.isAxiosError) {
    log.warn(
      'axios 에러가 아닙니다. logAxiosError 는 axios 에러만을 로깅합니다.',
    );
    log.error(axiosError);
  }

  const { response, request, message, config } = axiosError;
  if (response) {
    const { data, headers } = response;
    log.error(
      '요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.',
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
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8001/'
      : 'https://[domain]/',
  withCredentials: true,
});

const passUrl = ['/api/auth/refresh-token', '/api/auth/login'];

const refreshAccessToken = async () => {
  const {
    data: { accessToken, expirationTime },
  } = await refreshAccessTokenApi();
  localStorage.setItem('expirationDate', expirationTime);
  memoryStore.set(Memory.ACCESS_TOKEN, accessToken);
};

const processProlongToken = async (config: AxiosRequestConfig) => {
  // 인터셉트를 패스시켜야 할 URL 접근일 때
  if (passUrl.includes(config.url as string)) {
    if (isDevelopment) {
      if (config.url === passUrl[0]) {
        log.debug('로그인 연장 처리 요청이므로 인터셉트 요청을 패스합니다.');
      } else {
        log.debug(`인터셉터 요청을 패스합니다. (${config.url})`);
      }
    }

    return config;
  }

  try {
    const expiration = localStorage.getItem('expirationDate');

    if (expiration === null) {
      await refreshAccessToken();
      return config;
    }

    // 액세스 토큰 만료기한이 지났을 때
    const nowDate = new Date();
    const expirationDate = new Date(expiration);

    if (nowDate > expirationDate) {
      if (isDevelopment) {
        log.debug('로그인 유효기간이 지났으므로, 토큰 유효기간을 연장합니다.');
      }
      try {
        await refreshAccessToken();
      } catch (err) {
        log.setLevel('ERROR');
        log.error(err);
        return config;
      }
    }

    // 브라우저 리다이렉션 또는 외부요인으로 스토어 데이터가 손실됬을 때
    const accessToken: string | undefined = memoryStore.get(
      Memory.ACCESS_TOKEN,
    );
    try {
      if (accessToken === undefined) {
        if (isDevelopment) {
          log.debug('메모리 스토어에 액세스 토큰이 없습니다.');
          log.debug('액세스 토큰 재발행 및 스토어 저장과 갱신을 진행합니다.');
        }
        await refreshAccessToken();
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      }
    } catch (err) {
      if (isDevelopment) {
        log.error('액세스 토큰 갱신을 실패하였습니다.');
      }
      log.error(err);
      return config;
    }

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  } catch (err) {
    // SSR 요청일 때
    if (isDevelopment) {
      log.debug('서버사이드 요청이므로 인터셉트가 패스됩니다.');
    }
    return config;
  }
};

apiClient.interceptors.request.use(processProlongToken, undefined);

export default apiClient;
