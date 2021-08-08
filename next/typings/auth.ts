import type { IGeneralServerResponse } from './common';

/**
 * 로그인 요청에 필요한 정보
 */
export interface ISignInProps {
  email: string;
  password: string;
}

/**
 * 회원가입 요청에 필요한 정보
 */
export interface ISignUpProps {
  email: string;
  username: string;
  password: string;
  skills: number[] | null;
  job: number | null;
}

/**
 * 회원가입/로그인/액세스토큰연장 성공 응답 스키마
 */
export interface IAuthSuccessResponse extends IGeneralServerResponse {
  accessToken: string;
  expiration: string;
  user: IUserInfo;
}

/**
 * 유저가 가지고 있는 정보
 */
export interface IUserInfo {
  id: number;
  username: string;
  email: string;
  skills: IOptionalProps[] | null;
  job: IOptionalProps | null;
}

/**
 * 토큰으로 유저 정보를 요청했을 떄의 성공 응답
 */
export interface IUserGetSuccessResponse extends IUserInfo {
  isLoggedIn: boolean; // true
}

/**
 * 토큰으로 유저 정보를 요청했을 떄의 실패 응답
 */
export interface IUserGetFailureResponse {
  isLoggedIn: boolean; // false
}

/**
 * 회원가입 optional 페이지에서 서버로부터 받는 선택 옵션들의 타입
 */
export interface IOptionalProps {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
