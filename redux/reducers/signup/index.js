import { createSlice } from '@reduxjs/toolkit';
import fromActionTypes from '~/lib/fromActionTypes';

const initialState = {
  email: null,
  nickname: null,
  password: null,
  field: null,
  job: null,
  sendEmailLoading: false,
  sendEmailDone: false,
  sendEmailError: null,
  verifyEmailLoading: false,
  verifyEmailDone: false,
  verifyEmailError: null,
  verifySocialLoading: false,
  verifySocialDone: false,
  verifySocialError: null,
  saveRequiredInfoDone: false,
  saveOptionalInfoDone: false,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
};

const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    SEND_EMAIL_REQUEST: (state, action) => {
      state.sendEmailLoading = true;
      state.sendEmailDone = false;
      state.sendEmailError = null;
      localStorage.setItem('email', action.payload);
    },
    SEND_EMAIL_SUCCESS: (state) => {
      state.sendEmailLoading = false;
      state.sendEmailDone = true;
    },
    SEND_EMAIL_FAILURE: (state, action) => {
      state.sendEmailLoading = false;
      state.sendEmailError = action.error;
      localStorage.removeItem('email');
    },
    VERIFY_EMAIL_REQUEST: (state) => {
      state.verifyEmailLoading = true;
      state.verifyEmailDone = false;
      state.verifyEmailError = null;
    },
    VERIFY_EMAIL_SUCCESS: (state, action) => {
      state.verifyEmailLoading = false;
      state.verifyEmailDone = true;
      state.verifySocialDone = true;
      state.email = action.email;
    },
    VERIFY_EMAIL_FAILURE: (state, action) => {
      state.verifyEmailLoading = false;
      state.verifyEmailError = action.error;
    },
    VERIFY_SOCIAL_REQUEST: (state) => {
      state.verifySocialLoading = true;
      state.verifySocialDone = false;
      state.verifySocialError = null;
    },
    VERIFY_SOCIAL_SUCCESS: (state) => {
      state.verifySocialLoading = false;
      state.verifySocialDone = true;
      state.verifyEmailDone = true;
    },
    VERIFY_SOCIAL_FAILURE: (state, action) => {
      state.verifySocialLoading = false;
      state.verifySocialError = action.error;
    },
    SAVE_REQUIRED_INFO: (state, action) => {
      state.nickname = action.nickname;
      state.password = action.password;
      state.saveRequiredInfoDone = true;
    },
    SAVE_OPTIONAL_INFO: (state, action) => {
      state.field = action.field;
      state.job = action.job;
      state.saveOptionalInfoDone = true;
    },
    SIGN_UP_REQUEST: (state) => {
      state.signUpLoading = true;
      state.signUpDone = false;
      state.signUpError = null;
    },
    SIGN_UP_SUCCESS: (state) => {
      state.signUpLoading = false;
      state.signUpDone = true;
      localStorage.removeItem('email');
    },
    SIGN_UP_FAILURE: (state, action) => {
      state.signUpLoading = false;
      state.signUpError = action.error;
    },
    RESET_SIGN_UP: () => initialState,
  },
});

// 액션 타입
export const {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  // VERIFY_SOCIAL_REQUEST,
  // VERIFY_SOCIAL_SUCCESS,
  // VERIFY_SOCIAL_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} = fromActionTypes(signUpSlice.actions);

// 액션 크리에이터
export const {
  SEND_EMAIL_REQUEST: sendEmailRequest,
  VERIFY_EMAIL_REQUEST: verifyEmailRequest,
  // VERIFY_SOCIAL_REQUEST: verifySocialRequest,
  SAVE_REQUIRED_INFO: saveRequiredInfo,
  SAVE_OPTIONAL_INFO: saveOptionalInfoRequest,
  RESET_SIGN_UP: resetSignUp,
} = signUpSlice.actions;

export default signUpSlice.reducer;
