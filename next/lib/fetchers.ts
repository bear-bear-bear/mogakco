import apiClient from '@lib/apiClient';
import devModeLog from '@lib/devModeLog';
import type { IGeneralServerResponse } from 'typings/common';
import type {
  ILoginProps,
  ILoginSuccessResponse,
  IOptionalProps,
  IProlongTokenProps,
  ISignUpResponse,
  ISignUpUserProps,
} from 'typings/auth';
import { IncomingHttpHeaders } from 'http';

// FIXME: swr fetcher 형식에 맞게 변경하기

// ********************************************************************************************************************
// user
// ********************************************************************************************************************
// 로그인
export const logInApi = (data: ILoginProps) =>
  apiClient.post<ILoginSuccessResponse>('/api/auth/login', data);

// 로그아웃
export const logOutApi = () =>
  apiClient.post<IGeneralServerResponse>('/api/auth/logout');

// 로그인 연장
export const refreshAccessTokenApi = () =>
  apiClient.get<IProlongTokenProps>('/api/auth/refresh-token');

// Next.js SSR 용 로그인 연장 Api
export const refreshAccessTokenApiSSR = (headers: IncomingHttpHeaders) =>
  apiClient.get<IProlongTokenProps>('/api/auth/refresh-token', {
    headers,
  });

// 로그인 연장 테스트 Api
export const authProlongTestApi = () =>
  apiClient
    .get<{ user: { id: number; username: string } }>('/api/auth/test')
    .then(({ data }) => {
      window.alert(
        `테스트 성공 (로그인 자동 연장 ) 로그인한 유저: ${data.user.username}`,
      );
    })
    .catch((err) => {
      devModeLog(err);
      window.alert('로그인 연장 실패, 로그를 확인해주세요.');
    });

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
