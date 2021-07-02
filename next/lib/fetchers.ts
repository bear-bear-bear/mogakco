import apiClient from '@lib/apiClient';
import type { IGeneralServerResponse } from 'typings/common';
import type {
  ILoginProps,
  ILoginSuccessResponse,
  IOptionalProps,
  ISignUpResponse,
  ISignUpUserProps,
} from 'typings/auth';

// FIXME: swr fetcher 형식에 맞게 변경하기

// ********************************************************************************************************************
// user
// ********************************************************************************************************************
// 로그인
export const logInFetcher = (data: ILoginProps) =>
  apiClient.post<ILoginSuccessResponse | IGeneralServerResponse>(
    '/api/auth/login',
    data,
  );
// 로그아웃
export const logOutFetcher = () => apiClient.get('/api/auth/logout');

// ********************************************************************************************************************
// sign-up
// ********************************************************************************************************************
// 검증 이메일 전송
export const sendEmailFetcher = (email: string) =>
  apiClient.post<IGeneralServerResponse>(
    '/api/auth/send-token/before-register',
    { email },
  );
// 이메일 검증에 성공시 나타나는 쿼리의 이메일에 대해 다시 한 번 검증
export const verifyEmailFetcher = (email: string) =>
  apiClient.get<IGeneralServerResponse>(
    `/api/auth/is-verified/before-register?email=${email}`,
  );
// 개발 분야 목록 불러오기
export const loadSkillsFetcher = () =>
  apiClient.get<IOptionalProps>(`/api/user/skills`);
// 직업 목록 불러오기
export const loadJobsFetcher = () =>
  apiClient.get<IOptionalProps>(`/api/user/jobs`);
// 회원가입
export const signUpFetcher = (data: ISignUpUserProps) =>
  apiClient.post<ISignUpResponse | IGeneralServerResponse>('/api/auth', data);
