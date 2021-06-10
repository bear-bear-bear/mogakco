import { createSlice } from '@reduxjs/toolkit';
import fromActionTypes from '~/lib/fromActionTypes';

const initialState = {
  userInfo: {
    email: null,
    username: null,
    password: null,
    skills: null, // 사용자가 선택한 skills
    job: null, // 사용자가 선택한 job
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
  saveOptionalInfoDone: false, // 미 필수 정보 저장 완료 여부
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
      localStorage.setItem('email', action.payload);
    },
    SEND_EMAIL_SUCCESS: (state) => {
      state.sendEmailLoading = false;
      state.sendEmailDone = true;
    },
    SEND_EMAIL_FAILURE: (state, action) => {
      state.sendEmailLoading = false;
      state.sendEmailError = action.error;
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
      state.userInfo.email = action.email;
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
    LOAD_SKILLS_REQUEST: (state) => {
      state.loadSkillsLoading = true;
      state.loadSkillsDone = false;
      state.loadSkillsError = null;
    },
    LOAD_SKILLS_SUCCESS: (state, action) => {
      state.loadSkillsLoading = false;
      state.loadSkillsDone = true;
      state.skills = action.skills;
    },
    LOAD_SKILLS_FAILURE: (state, action) => {
      state.loadSkillsLoading = false;
      state.loadSkillsError = action.error;
    },
    LOAD_JOBS_REQUEST: (state) => {
      state.loadJobsLoading = true;
      state.loadJobsDone = false;
      state.loadJobsError = null;
    },
    LOAD_JOBS_SUCCESS: (state, action) => {
      state.loadJobsLoading = false;
      state.loadJobsDone = true;
      state.jobs = action.jobs;
    },
    LOAD_JOBS_FAILURE: (state, action) => {
      state.loadJobsLoading = false;
      state.loadJobsError = action.error;
    },
    SAVE_REQUIRED_INFO: (state, action) => {
      const { username, password } = action.payload;
      state.userInfo.username = username;
      state.userInfo.password = password;
      state.saveRequiredInfoDone = true;
    },
    SAVE_OPTIONAL_INFO: (state, action) => {
      const { skills, job } = action.payload;
      state.userInfo.skills = skills;
      state.userInfo.job = job;
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
} = fromActionTypes(signUpSlice.actions);

// 액션 크리에이터
export const {
  SEND_EMAIL_REQUEST: sendEmailRequest,
  VERIFY_EMAIL_REQUEST: verifyEmailRequest,
  VERIFY_SOCIAL_REQUEST: verifySocialRequest,
  LOAD_SKILLS_REQUEST: loadSkillsRequest,
  LOAD_JOBS_REQUEST: loadJobsRequest,
  SAVE_REQUIRED_INFO: saveRequiredInfo,
  SAVE_OPTIONAL_INFO: saveOptionalInfoRequest,
  SIGN_UP_REQUEST: signUpRequest,
  RESET_SIGN_UP: resetSignUp,
} = signUpSlice.actions;

export default signUpSlice.reducer;
