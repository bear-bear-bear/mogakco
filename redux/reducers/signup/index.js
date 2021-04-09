import { handleActions } from 'redux-actions';
import produce from 'immer';
import {
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_SOCIAL_REQUEST,
  VERIFY_SOCIAL_SUCCESS,
  VERIFY_SOCIAL_FAILURE,
} from '~/redux/actions/signup/auth';

import {
  VERIFY_INFO_REQUEST,
  VERIFY_INFO_SUCCESS,
  VERIFY_INFO_FAILURE,
} from '~/redux/actions/signup/info';

import {
  VERIFY_INTEREST_REQUEST,
  VERIFY_INTEREST_SUCCESS,
  VERIFY_INTEREST_FAILURE,
} from '~/redux/actions/signup/interest';

const initialState = {
  verifyAuthLoading: false,
  verifyAuthDone: false,
  verifyAuthError: null,
  verifyInfoLoading: false,
  verifyInfoDone: false,
  verifyInfoError: null,
  verifyInterestLoading: false,
  verifyInterestDone: false,
  verifyInterestError: null,
};

const signupReducer = handleActions(
  {
    [VERIFY_EMAIL_REQUEST]: state =>
      produce(state, draft => {
        draft.verifyAuthLoading = true;
        draft.verifyAuthDone = false;
        draft.verifyAuthError = null;
      }),
    [VERIFY_EMAIL_SUCCESS]: state =>
      produce(state, draft => {
        draft.verifyAuthLoading = false;
        draft.verifyAuthDone = true;
      }),
    [VERIFY_EMAIL_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.verifyAuthLoading = false;
        draft.verifyAuthError = action.error;
      }),
    [VERIFY_SOCIAL_REQUEST]: state =>
      produce(state, draft => {
        draft.verifyAuthLoading = true;
        draft.verifyAuthDone = false;
        draft.verifyAuthError = null;
      }),
    [VERIFY_SOCIAL_SUCCESS]: state =>
      produce(state, draft => {
        draft.verifyAuthLoading = false;
        draft.verifyAuthDone = true;
        draft.verifyInfoDone = true;
      }),
    [VERIFY_SOCIAL_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.verifyAuthLoading = false;
        draft.verifyAuthError = action.error;
      }),
    [VERIFY_INFO_REQUEST]: state =>
      produce(state, draft => {
        draft.verifyInfoLoading = true;
        draft.verifyInfoDone = false;
        draft.verifyInfoError = null;
      }),
    [VERIFY_INFO_SUCCESS]: state =>
      produce(state, draft => {
        draft.verifyInfoLoading = false;
        draft.verifyInfoDone = true;
      }),
    [VERIFY_INFO_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.verifyInfoLoading = false;
        draft.verifyInfoError = action.error;
      }),
    [VERIFY_INTEREST_REQUEST]: state =>
      produce(state, draft => {
        draft.verifyInterestLoading = true;
        draft.verifyIntrestDone = false;
        draft.verifyIntrestError = null;
      }),
    [VERIFY_INTEREST_SUCCESS]: state =>
      produce(state, draft => {
        draft.verifyInterestLoading = false;
        draft.verifyInterestDone = true;
      }),
    [VERIFY_INTEREST_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.verifyInterestLoading = false;
        draft.verifyInterestError = action.error;
      }),
  },
  initialState,
);

export default signupReducer;
