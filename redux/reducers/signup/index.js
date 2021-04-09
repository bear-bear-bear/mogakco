import { handleActions } from 'redux-actions';
import produce from 'immer';
import {
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
} from '~/redux/actions/signup/auth';

import {
  VERIFY_INFO_REQUEST,
  VERIFY_INFO_SUCCESS,
  VERIFY_INFO_FAILURE,
} from '~/redux/actions/signup/info';

const initialState = {
  verifyEmailLoading: false,
  verifyEmailDone: false,
  verifyEmailError: null,
  verifyInfoLoading: false,
  verifyInfoDone: false,
  verifyInfoError: null,
};

const signupReducer = handleActions(
  {
    [VERIFY_EMAIL_REQUEST]: state =>
      produce(state, draft => {
        draft.verifyEmailLoading = true;
        draft.verifyEmailDone = false;
        draft.verifyEmailError = null;
      }),
    [VERIFY_EMAIL_SUCCESS]: state =>
      produce(state, draft => {
        draft.verifyEmailLoading = false;
        draft.verifyEmailDone = true;
      }),
    [VERIFY_EMAIL_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.verifyEmailLoading = false;
        draft.verifyEmailError = action.error;
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
  },
  initialState,
);

export default signupReducer;
