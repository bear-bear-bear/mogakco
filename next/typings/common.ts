import { AxiosError } from 'axios';

/**
 *  통상 서버 응답 구조 스키마
 */
export interface IGeneralServerResponse {
  message: string;
  statusCode: number;
  error?: string | string[];
}

/**
 * Axios 에러 타입
 */
export type GeneralAxiosError = AxiosError<IGeneralServerResponse>;

/**
 * object 타입 대신 사용
 */
export type AnyObject = Record<string, any>;

/**
 * T 에서 null 또는 undefined를 삭제한 필드 반환
 */
export type NoUndefinedField<T> = {
  [P in keyof T]-?: Exclude<T[P], null | undefined>;
};

/**
 * keyof 의 반환값인 string | number 에서 string 만을 반환해줌
 */
export type KeyOf<T extends AnyObject> = Extract<keyof T, string>;
