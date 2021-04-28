import { createAction } from 'redux-actions';

// 액션
export const VERIFY_INFO_REQUEST = 'info/VERIFY_INFO_REQUEST';
export const VERIFY_INFO_SUCCESS = 'info/VERIFY_INFO_SUCCESS';
export const VERIFY_INFO_FAILURE = 'info/VERIFY_INFO_FAILURE';

// 액션 크리에이터
export const verifyInfoRequest = createAction(
  VERIFY_INFO_REQUEST,
  info => info,
);
