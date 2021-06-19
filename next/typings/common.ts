import { AxiosRequestConfig } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

// 통상 서버 응답 구조 스키마
export interface IGeneralServerResponse {
  message: string;
  statusCode: number;
  error?: string | string[];
}

// getAxiosError 함수 반환 값
export interface IGetAxiosError {
  error:
    | IGeneralServerResponse
    | { message: string; axiosConfig: AxiosRequestConfig }
    | any;
}

export type ErrorPayload = PayloadAction<{ error: IGetAxiosError }>;
