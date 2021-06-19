import axios, { AxiosError } from 'axios';
import log from 'loglevel';
import { IGeneralServerResponse } from '~/typings/common';

export const getAxiosError = (
  axiosError: AxiosError<IGeneralServerResponse>,
) => {
  if (process.env.NODE_ENV === 'production') {
    return '배포 모드에선 로그를 표시하지 않습니다.';
  }

  log.setLevel('debug');

  if (!axiosError.isAxiosError) {
    log.warn(
      'axios 에러가 아닙니다. getAxiosError 는 axios 에러만을 로깅합니다.',
    );
    log.error(axiosError);
    return axiosError;
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

  return response?.data || request || { message, axiosConfig: config };
};

/**
 * @desc api 요청 클라이언트
 */
const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8001/'
      : 'https://[domain]/',
  // withCredentials: true,
});

export default apiClient;
