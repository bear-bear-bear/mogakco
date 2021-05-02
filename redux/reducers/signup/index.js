import { handleActions } from 'redux-actions';
import produce from 'immer';
import {
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_SOCIAL_REQUEST,
  VERIFY_SOCIAL_SUCCESS,
  VERIFY_SOCIAL_FAILURE,
} from '~/redux/actions/SignUp/auth';

import {
  VERIFY_INFO_REQUEST,
  VERIFY_INFO_SUCCESS,
  VERIFY_INFO_FAILURE,
} from '~/redux/actions/SignUp/info';

import {
  VERIFY_INTEREST_REQUEST,
  VERIFY_INTEREST_SUCCESS,
  VERIFY_INTEREST_FAILURE,
} from '~/redux/actions/SignUp/interest';

import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '~/redux/actions/SignUp/signup';

const initialState = {
  email: '',
  nickname: '',
  password: '',
  field: '',
  job: '',
  verifyEmailLoading: false,
  verifyEmailDone: false,
  verifyEmailError: null,
  verifySocialLoading: false,
  verifySocialDone: false,
  verifySocialError: null,
  verifyInfoLoading: false,
  verifyInfoDone: false,
  verifyInfoError: null,
  verifyInterestLoading: false,
  verifyInterestDone: false,
  verifyInterestError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
};

const signUpReducer = handleActions(
  {
    [VERIFY_EMAIL_REQUEST]: (state, action) =>
      produce(state, draft => {
        draft.verifyEmailLoading = true;
        draft.verifyEmailDone = false;
        draft.verifyEmailError = null;
        localStorage.setItem('email', action.payload);
      }),
    [VERIFY_EMAIL_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.verifyEmailLoading = false;
        draft.verifyEmailDone = true;
        draft.verifySocialDone = true;
        draft.email = action.email;
        localStorage.removeItem('email');
      }),
    [VERIFY_EMAIL_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.verifyEmailLoading = false;
        draft.verifyEmailError = action.error;
        localStorage.removeItem('email');
      }),
    [VERIFY_SOCIAL_REQUEST]: state =>
      produce(state, draft => {
        draft.verifySocialLoading = true;
        draft.verifySocialDone = false;
        draft.verifySocialError = null;
      }),
    [VERIFY_SOCIAL_SUCCESS]: state =>
      produce(state, draft => {
        draft.verifySocialLoading = false;
        draft.verifySocialDone = true;
        draft.verifyEmailDone = true;
        draft.verifyInfoDone = true;
      }),
    [VERIFY_SOCIAL_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.verifySocialLoading = false;
        draft.verifySocialError = action.error;
      }),
    [VERIFY_INFO_REQUEST]: state =>
      produce(state, draft => {
        draft.verifyInfoLoading = true;
        draft.verifyInfoDone = false;
        draft.verifyInfoError = null;
      }),
    [VERIFY_INFO_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.verifyInfoLoading = false;
        draft.verifyInfoDone = true;
        draft.nickname = action.nickname;
        draft.password = action.password;
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
    [VERIFY_INTEREST_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.verifyInterestLoading = false;
        draft.verifyInterestDone = true;
        draft.field = action.field;
        draft.job = action.job;
      }),
    [VERIFY_INTEREST_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.verifyInterestLoading = false;
        draft.verifyInterestError = action.error;
      }),
    [SIGN_UP_REQUEST]: state =>
      produce(state, draft => {
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
      }),
    [SIGN_UP_SUCCESS]: state =>
      produce(state, draft => {
        draft.signUpLoading = false;
        draft.signUpDone = true;
      }),
    [SIGN_UP_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.signUpLoading = false;
        draft.signUpError = action.error;
      }),
  },
  initialState,
);

export default signUpReducer;
