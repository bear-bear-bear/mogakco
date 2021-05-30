import { put, takeLatest, all, fork, call } from 'redux-saga/effects';

import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  LOAD_SKILLS_REQUEST,
  LOAD_SKILLS_SUCCESS,
  LOAD_SKILLS_FAILURE,
  LOAD_JOBS_REQUEST,
  LOAD_JOBS_SUCCESS,
  LOAD_JOBS_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '~/redux/reducers/signup';
import { LOG_IN_SUCCESS } from '~/redux/reducers/common/user';
import apiClient, { getAxiosError } from '~/lib/apiClient';

// 인증 이메일 전송
// 인증 이메일에서 /signup으로 리다이렉션 시에, localStorage 안의 이메일로 이메일 검증여부 확인
// 회원가입 완료시 입력한 정보들 모아서 회원가입 요청

const sendEmailAPI = (email) =>
  apiClient.post('/api/user/send-token/before-register', { email });
function* sendEmail(action) {
  try {
    yield call(sendEmailAPI, action.payload);
    yield put({
      type: SEND_EMAIL_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SEND_EMAIL_FAILURE,
      error: getAxiosError(err),
    });
  }
}

const verifyEmailAPI = (email) =>
  apiClient.get(`/api/user/is-verified/before-register?email=${email}`);
function* verifyEmail(action) {
  try {
    yield call(verifyEmailAPI, action.payload);
    yield put({
      type: VERIFY_EMAIL_SUCCESS,
      email: action.payload,
    });
  } catch (err) {
    yield put({
      type: VERIFY_EMAIL_FAILURE,
      error: getAxiosError(err),
    });
  }
}

// const loadSkillsAPI = () => apiClient.get(`/api/user/skills`);
function* loadSkills() {
  try {
    // const result = yield call(loadSkillsAPI);
    yield put({
      type: LOAD_SKILLS_SUCCESS,
      // skills: result.skills,
    });
  } catch (err) {
    yield put({
      type: LOAD_SKILLS_FAILURE,
      error: getAxiosError(err),
    });
  }
}

// const loadJobsAPI = () => apiClient.get(`/api/user/jobs`);
function* loadJobs() {
  try {
    // const result = yield call(loadJobsAPI);
    yield put({
      type: LOAD_JOBS_SUCCESS,
      // jobs: result.jobs,
    });
  } catch (err) {
    yield put({
      type: LOAD_JOBS_FAILURE,
      error: getAxiosError(err),
    });
  }
}

const signUpApi = (data) => apiClient.post('/api/user', data);
function* verifySignUp(action) {
  try {
    const result = yield call(signUpApi, action.payload);
    yield put({ type: SIGN_UP_SUCCESS });
    yield put({
      type: LOG_IN_SUCCESS,
      token: result.token,
    });
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE, error: getAxiosError(err) });
  }
}

function* watchSendEmail() {
  yield takeLatest(SEND_EMAIL_REQUEST, sendEmail);
}

function* watchVerifyEmail() {
  yield takeLatest(VERIFY_EMAIL_REQUEST, verifyEmail);
}

function* watchLoadSkills() {
  yield takeLatest(LOAD_SKILLS_REQUEST, loadSkills);
}

function* watchLoadJobs() {
  yield takeLatest(LOAD_JOBS_REQUEST, loadJobs);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, verifySignUp);
}

export default function* signUpSaga() {
  yield all([
    fork(watchSendEmail),
    fork(watchVerifyEmail),
    fork(watchLoadSkills),
    fork(watchLoadJobs),
    fork(watchSignUp),
  ]);
}
