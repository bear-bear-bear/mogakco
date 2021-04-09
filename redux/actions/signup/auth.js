import { createAction } from 'redux-actions';

// 액션
export const VERIFY_EMAIL_REQUEST = 'auth/VERIFY_EMAIL_REQUEST';
export const VERIFY_EMAIL_SUCCESS = 'auth/VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAILURE = 'auth/VERIFY_EMAIL_FAILURE';

// 액션 크리에이터
export const verifyEmailRequest = createAction(
  VERIFY_EMAIL_REQUEST,
  input => input,
);
