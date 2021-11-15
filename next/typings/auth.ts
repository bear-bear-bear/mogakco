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
 * 유저 정보 수정 요청 데이터 타입
 */
export interface IAccountEditProps {
  id: number;
  username: string;
  email: string;
  skills: number[] | null;
  job: number | null;
}

/**
 * 유저 정보 수정 요청 응답 데이터 타입
 */
export interface IAccountEditResponse extends IGeneralServerResponse {
  user: IUserInfo;
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
 * TODO 구성
 */
export type TodoItem = {
  id: number;
  createdAt: Date;
  status: 'next up' | 'in progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  title?: string;
  description?: string;
  iconUrl?: string;
  coverUrl?: string;
  dueDate?: Date;
};

type NoUndefinedPriority = Exclude<TodoItem['priority'], undefined>;
export type TodoOrder = {
  status: { [key in TodoItem['status']]: TodoItem['id'][] };
  priority: { [key in NoUndefinedPriority]: TodoItem['id'][] };
  all: TodoItem['id'][];
};

export type Todo = {
  items: TodoItem[];
  order: TodoOrder;
};

/**
 * 유저가 가지고 있는 정보
 */
export interface IUserInfo {
  id: number;
  username: string;
  email: string;
  skills: IOptionalProps[] | null;
  job: IOptionalProps | null;
  todo: Todo;
}

/**
 * 토큰으로 유저 정보를 요청했을 떄의 응답
 */
export interface IUserGetResponse extends Partial<IUserInfo> {
  isLoggedIn: boolean;
}

/**
 * 토큰으로 유저 정보를 요청했을 떄의 성공 응답 (타입 단언에 사용)
 */
export interface IUserGetSuccessResponse extends IUserInfo {
  isLoggedIn: true;
}

/**
 * 회원가입 optional 페이지에서 서버로부터 받는 선택 옵션들의 타입
 */
export interface IOptionalProps {
  id: number;
  name: string;
}
export interface IOptionalPropsResponse extends IGeneralServerResponse {
  list: IOptionalProps[] | null;
}

/**
 * 회원가입 optional 페이지에서 서버로부터 받는 선택 옵션들의 타입
 */
export interface IGetChatRoomIdResponse extends IGeneralServerResponse {
  roomId: number;
}
