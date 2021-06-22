import { PayloadAction } from '@reduxjs/toolkit';

// 통상 서버 응답 구조 스키마
export interface IGeneralServerResponse {
  message: string;
  statusCode: number;
  error?: string | string[];
}

export type ErrorPayload = PayloadAction<IGeneralServerResponse>;

export type Theme = {
  palette: {
    white: string;
    black: string;
    yellow: string;
    blue: string;
  };
};
