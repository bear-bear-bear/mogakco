/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ISignUpState, IOptionalInfoProps } from '@typings/auth';
import type { ErrorPayload } from '@typings/common';
import fromActionTypes from '@lib/fromActionTypes';

const initialState: ISignUpState = {
  userInfo: {
    email: null,
    username: null,
    password: null,
    // skills: null, // 사용자가 선택한 skills, 상태로 저장되지 않고 컴포넌트에서 1회성 정보로 처리됩니다.
    // job: null, // 사용자가 선택한 job, 상태로 저장되지 않고 컴포넌트에서 1회성 정보로 처리됩니다.
  },
  sendEmailLoading: false, // 이메일 전송 요청 중
  sendEmailDone: false,
  sendEmailError: null,
  verifyEmailLoading: false, // 쿼리 속 이메일에 대한 검증 요청 중
  verifyEmailDone: false,
  verifyEmailError: null,
  verifySocialLoading: false, // 소셜 회원가입 요청 중
  verifySocialDone: false,
  verifySocialError: null,
  loadSkillsLoading: false, // skill 목록 요청 중
  loadSkillsDone: false,
  loadSkillsError: null,
  loadJobsLoading: false, // job 목록 요청 중
  loadJobsDone: false,
  loadJobsError: null,
  saveRequiredInfoDone: false, // 필수 정보 저장 완료 여부
  signUpLoading: false, // 회원가입 요청 중
  signUpDone: false,
  signUpError: null,
  skills: [], // 서버에서 내려주는 skills 목록
  jobs: [], // 서버에서 내려주는 jobs 목록
};

const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    SEND_EMAIL_REQUEST: (state, action) => {
      state.sendEmailLoading = true;
      state.sendEmailDone = false;
      state.sendEmailError = null;
    },
    SEND_EMAIL_SUCCESS: (state) => {
      state.sendEmailLoading = false;
      state.sendEmailDone = true;
    },
    SEND_EMAIL_FAILURE: (state, { payload: error }: ErrorPayload) => {
      state.sendEmailLoading = false;
      state.sendEmailError = error;
    },
    VERIFY_EMAIL_REQUEST: (state, action) => {
      // SSR로 1회성 실행되므로 done과 error에 대한 초기화 X
      // done과 error에 대한 초기화 적용 시 SSR 에서 saga(SUCCESS | FAILURE)에 의해 저장된 state를 이 액션이 덮어 씌움
      state.verifyEmailLoading = true;
    },
    VERIFY_EMAIL_SUCCESS: (state, action) => {
      state.verifyEmailLoading = false;
      state.verifyEmailDone = true;
      state.verifySocialDone = true;
    },
    VERIFY_EMAIL_FAILURE: (state, { payload: error }: ErrorPayload) => {
      state.verifyEmailLoading = false;
      state.verifyEmailError = error;
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
    VERIFY_SOCIAL_FAILURE: (state, { payload: error }: ErrorPayload) => {
      state.verifySocialLoading = false;
      state.verifySocialError = error;
    },
    LOAD_SKILLS_REQUEST: (state) => {
      state.loadSkillsLoading = true;
      state.loadSkillsDone = false;
      state.loadSkillsError = null;
    },
    LOAD_SKILLS_SUCCESS: (
      state,
      { payload: skills }: PayloadAction<IOptionalInfoProps[]>,
    ) => {
      state.loadSkillsLoading = false;
      state.loadSkillsDone = true;
      state.skills = skills;
    },
    LOAD_SKILLS_FAILURE: (state, { payload: error }: ErrorPayload) => {
      state.loadSkillsLoading = false;
      state.loadSkillsError = error;
    },
    LOAD_JOBS_REQUEST: (state) => {
      state.loadJobsLoading = true;
      state.loadJobsDone = false;
      state.loadJobsError = null;
    },
    LOAD_JOBS_SUCCESS: (
      state,
      { payload: jobs }: PayloadAction<IOptionalInfoProps[]>,
    ) => {
      state.loadJobsLoading = false;
      state.loadJobsDone = true;
      state.jobs = jobs;
    },
    LOAD_JOBS_FAILURE: (state, { payload: error }: ErrorPayload) => {
      state.loadJobsLoading = false;
      state.loadJobsError = error;
    },
    SAVE_REQUIRED_INFO: (state, action) => {
      const { username, password } = action.payload;
      state.userInfo.username = username;
      state.userInfo.password = password;
      state.saveRequiredInfoDone = true;
    },
    SIGN_UP_REQUEST: (state, action) => {
      state.signUpLoading = true;
      state.signUpDone = false;
      state.signUpError = null;
    },
    SIGN_UP_SUCCESS: (state) => {
      state.signUpLoading = false;
      state.signUpDone = true;
    },
    SIGN_UP_FAILURE: (state, { payload: error }: ErrorPayload) => {
      state.signUpLoading = false;
      state.signUpError = error;
    },
    RESET_SIGN_UP: () => initialState,
  },
});

type ActionListType = typeof signUpSlice.actions;
// 액션 타입
export const {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_SOCIAL_REQUEST,
  VERIFY_SOCIAL_SUCCESS,
  VERIFY_SOCIAL_FAILURE,
  LOAD_SKILLS_REQUEST,
  LOAD_SKILLS_SUCCESS,
  LOAD_SKILLS_FAILURE,
  LOAD_JOBS_REQUEST,
  LOAD_JOBS_SUCCESS,
  LOAD_JOBS_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} = fromActionTypes<ActionListType>(signUpSlice.actions);

// 액션 크리에이터
export const {
  SEND_EMAIL_REQUEST: sendEmailRequest,
  VERIFY_EMAIL_REQUEST: verifyEmailRequest,
  VERIFY_SOCIAL_REQUEST: verifySocialRequest,
  LOAD_SKILLS_REQUEST: loadSkillsRequest,
  LOAD_JOBS_REQUEST: loadJobsRequest,
  SAVE_REQUIRED_INFO: saveRequiredInfo,
  SIGN_UP_REQUEST: signUpRequest,
  RESET_SIGN_UP: resetSignUp,
} = signUpSlice.actions;

export default signUpSlice;
