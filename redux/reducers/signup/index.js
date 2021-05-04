import { createSlice } from '@reduxjs/toolkit';
import actionTypesFrom from '~/lib/actionTypesFrom';

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

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    VERIFY_EMAIL_REQUEST: (state, action) => {
      state.verifyEmailLoading = true;
      state.verifyEmailDone = false;
      state.verifyEmailError = null;
      localStorage.setItem('email', action.payload);
    },
    VERIFY_EMAIL_SUCCESS: (state, action) => {
      state.verifyEmailLoading = false;
      state.verifyEmailDone = true;
      state.verifySocialDone = true;
      state.email = action.email;
      localStorage.removeItem('email');
    },
    VERIFY_EMAIL_FAILURE: (state, action) => {
      state.verifyEmailLoading = false;
      state.verifyEmailError = action.error;
      localStorage.removeItem('email');
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
      state.verifyInfoDone = true;
    },
    VERIFY_SOCIAL_FAILURE: (state, action) => {
      state.verifySocialLoading = false;
      state.verifySocialError = action.error;
    },
    VERIFY_INFO_REQUEST: (state) => {
      state.verifyInfoLoading = true;
      state.verifyInfoDone = false;
      state.verifyInfoError = null;
    },
    VERIFY_INFO_SUCCESS: (state, action) => {
      state.verifyInfoLoading = false;
      state.verifyInfoDone = true;
      state.nickname = action.nickname;
      state.password = action.password;
    },
    VERIFY_INFO_FAILURE: (state, action) => {
      state.verifyInfoLoading = false;
      state.verifyInfoError = action.error;
    },
    VERIFY_INTEREST_REQUEST: (state) => {
      state.verifyInterestLoading = true;
      state.verifyIntrestDone = false;
      state.verifyIntrestError = null;
    },
    VERIFY_INTEREST_SUCCESS: (state, action) => {
      state.verifyInterestLoading = false;
      state.verifyInterestDone = true;
      state.field = action.field;
      state.job = action.job;
    },
    VERIFY_INTEREST_FAILURE: (state, action) => {
      state.verifyInterestLoading = false;
      state.verifyInterestError = action.error;
    },
    SIGN_UP_REQUEST: (state) => {
      state.signUpLoading = true;
      state.signUpDone = false;
      state.signUpError = null;
    },
    SIGN_UP_SUCCESS: (state) => {
      state.signUpLoading = false;
      state.signUpDone = true;
    },
    SIGN_UP_FAILURE: (state, action) => {
      state.signUpLoading = false;
      state.signUpError = action.error;
    },
  },
});

// 액션 타입
export const {
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_SOCIAL_REQUEST,
  VERIFY_SOCIAL_SUCCESS,
  VERIFY_SOCIAL_FAILURE,
  VERIFY_INFO_REQUEST,
  VERIFY_INFO_SUCCESS,
  VERIFY_INFO_FAILURE,
  VERIFY_INTEREST_REQUEST,
  VERIFY_INTEREST_SUCCESS,
  VERIFY_INTEREST_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} = actionTypesFrom(signupSlice.actions);

// 액션 크리에이터
export const {
  VERIFY_EMAIL_REQUEST: verifyEmailRequest,
  VERIFY_SOCIAL_REQUEST: verifySocialRequest,
  VERIFY_INFO_REQUEST: verifyInfoRequest,
  VERIFY_INTEREST_REQUEST: verifyInterestRequest,
} = signupSlice.actions;

export default signupSlice.reducer;
