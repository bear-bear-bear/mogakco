import apiClient from './apiClient';

/**
 * @desc redux/sagas 디렉터리 구성 기준으로 작성됩니다.
 * 추후 API 개수가 많아지고 파일 크기가 늘어나면 디렉터리 단위로 분리 고려.
 */

// common/user
export const userAPIs = {
  logInAPI: (data) => apiClient.post('/user/login', data),
  logOutAPI: () => apiClient.get('/user/logout'),
};

// signup
export const signupAPIs = {
  sendEmailAPI: (email) =>
    apiClient.post('/api/user/send-token/before-register', { email }),
  verifyEmailAPI: (email) =>
    apiClient.get(`/api/user/is-verified/before-register?email=${email}`),
  loadSkillsAPI: () => apiClient.get(`/api/user/skills`),
  loadJobsAPI: () => apiClient.get(`/api/user/jobs`),
  signUpApI: (data) => apiClient.post('/api/user', data),
};
