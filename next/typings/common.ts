import { PayloadAction } from '@reduxjs/toolkit';
import { getAxiosError } from '~/lib/apiClient';

// 통상 서버 응답 구조 스키마
export interface IGeneralServerResponse {
  message: string;
  statusCode: number;
  error?: string | string[];
}

export type ErrorPayload = PayloadAction<IGeneralServerResponse>;
