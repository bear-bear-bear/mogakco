import axios from 'axios';

export const getAxiosError = (e) => e.response?.data || '에러가 발생했습니다.';

/**
 * @desc api 요청 클라이언트
 */
const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8001'
      : 'https://[domain]',
  withCredentials: true,
});

export default apiClient;
