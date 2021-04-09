import { createAction } from 'redux-actions';

// 액션
export const VERIFY_INTEREST_REQUEST = 'intersest/VERIFY_INTEREST_REQUEST';
export const VERIFY_INTEREST_SUCCESS = 'intersest/VERIFY_INTEREST_SUCCESS';
export const VERIFY_INTEREST_FAILURE = 'intersest/VERIFY_INTEREST_FAILURE';

// 액션 크리에이터
export const verifyInterestRequest = createAction(
  VERIFY_INTEREST_REQUEST,
  interest => interest,
);
