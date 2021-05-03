import { createAction } from 'redux-actions';

// 액션
export const VERIFY_EMAIL_REQUEST = 'auth/VERIFY_EMAIL_REQUEST';
export const VERIFY_EMAIL_SUCCESS = 'auth/VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAILURE = 'auth/VERIFY_EMAIL_FAILURE';
export const VERIFY_SOCIAL_REQUEST = 'auth/VERIFY_SOCIAL_REQUEST';
export const VERIFY_SOCIAL_SUCCESS = 'auth/VERIFY_SOCIAL_SUCCESS';
export const VERIFY_SOCIAL_FAILURE = 'auth/VERIFY_SOCIAL_FAILURE';

// 액션 크리에이터
export const verifyEmailRequest = createAction(
  VERIFY_EMAIL_REQUEST,
  (input) => input,
);

export const verifySocialRequest = createAction(
  VERIFY_SOCIAL_REQUEST,
  (input) => input,
);
