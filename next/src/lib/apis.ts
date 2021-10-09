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
import { UploadImageResponse } from 'typings/chat';

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
export const getVideoChatRoomIdApi = () =>
  apiClient
    .get<IGetChatRoomIdResponse>(`/api/chat/recommend/join`)
    .then(({ data: { roomId } }) => roomId);

// TODO: nest js api 추가 시 axios >> apiClient 로 변경
export const uploadImage = (formData: FormData) =>
  axios
    .post<UploadImageResponse>(`/api/chat/upload`, formData, {
      headers: { 'content-type': 'multipart/formdata' },
    })
    .then((res) => res.data);
