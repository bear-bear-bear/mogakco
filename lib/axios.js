import axios from 'axios';

export const getAxiosError = (e) =>
  e.response?.data ? e.response.data : '에러가 발생했습니다.';

/**
 * @desc api 요청 클라이언트
 * baseURL 에 /api 를 주지 않는 이유는 요청 주소가 api 임을 사용하면서 명시하는게 좋기 때문입니다.
 * 앞으로 사용에 맞게 수정해서 사용해주세요.
 */
export const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : '[domain]',
  withCredentials: true,
});
