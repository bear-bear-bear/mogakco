import axios from 'axios'; // temp
import apiClient, { logAxiosError } from '@lib/apiClient';
import type { IGeneralServerResponse } from 'typings/common';
import type {
  ISignInProps,
  ISignUpProps,
  IOptionalPropsResponse,
  IAuthSuccessResponse,
  IGetChatRoomIdResponse,
  IAccountEditProps,
  IAccountEditResponse,
} from 'typings/auth';
import { IncomingHttpHeaders } from 'http';

// TODO: 각 API 사용 시 res.data와 catch err 반복 제거해보기

// ********************************************************************************************************************
// user
// ********************************************************************************************************************
// 회원가입
export const signUpApi = (data: ISignUpProps) =>
  apiClient.post<IAuthSuccessResponse>('/api/auth', data);

// 로그인
export const signInApi = (data: ISignInProps) =>
  apiClient.post<IAuthSuccessResponse>('/api/auth/login', data);

// 로그아웃
export const signOutApi = () =>
  apiClient.post<IGeneralServerResponse>('/api/auth/logout');

// 로그인 연장
export const refreshAccessTokenApi = () =>
  apiClient.get<IAuthSuccessResponse>('/api/auth/refresh-token');

// Next.js SSR 용 로그인 연장 Api
export const refreshAccessTokenApiSSR = (headers: IncomingHttpHeaders) =>
  apiClient.get<IAuthSuccessResponse>('/api/auth/refresh-token', {
    headers,
  });

// 로그인 연장 테스트 Api
export const authProlongTestApi = () =>
  apiClient
    .get<{ user: { id: number; username: string } }>('/api/auth/test')
    .then(({ data }) => {
      window.alert(
        `테스트 성공(로그인 자동 연장): 로그인한 유저 - ${data.user.username}`,
      );
    })
    .catch(() => {
      window.alert('로그인 연장 실패, 로그를 확인해주세요.');
    });

// 유저 정보 수정
export const editAccountApi = (data: IAccountEditProps) =>
  apiClient
    .put<IAccountEditResponse>('/api/user', data)
    .then((res) => res.data.user);

// 계정 삭제
export const deleteAccountApi = () =>
  apiClient.delete<IGeneralServerResponse>('/api/user');

// ********************************************************************************************************************
// sign-up
// ********************************************************************************************************************
// 검증 이메일 전송
export const sendEmailApi = (email: string) =>
  apiClient.post<IGeneralServerResponse>(
    '/api/auth/send-token/before-register',
    { email },
  );
// 이메일 검증에 성공시 나타나는 쿼리의 이메일에 대해 다시 한 번 검증
export const verifyEmailApi = (email: string) =>
  apiClient.get<IGeneralServerResponse>(
    `/api/auth/is-verified/before-register?email=${email}`,
  );
// 개발 분야 목록 불러오기
export const loadSkillsApi = () =>
  apiClient
    .get<IOptionalPropsResponse>(`/api/user/skills`)
    .then((res) => res.data.list)
    .catch((err) => {
      logAxiosError(err);
      return null;
    });
// 직업 목록 불러오기
export const loadJobsApi = () =>
  apiClient
    .get<IOptionalPropsResponse>(`/api/user/jobs`)
    .then((res) => res.data.list)
    .catch((err) => {
      logAxiosError(err);
      return null;
    });

// ********************************************************************************************************************
// chat
// ********************************************************************************************************************
// 채팅방 찾기 또는 만들기
// TODO: 에러 처리 보충, 어떻게 할 지 이야기 하고 구현하기
export const getVideoChatRoomIdApi = () =>
  apiClient
    .get<IGetChatRoomIdResponse>(`/api/chat/recommend/join`)
    .then(({ data: { roomId } }) => roomId);
