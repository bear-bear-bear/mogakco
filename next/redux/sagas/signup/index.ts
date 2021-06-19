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

import { signupAPIs } from '~/lib/APIs';
import { getAxiosError } from '~/lib/apiClient';
import { SimpleStringPayload } from '~/typings/auth';

const { sendEmailAPI, verifyEmailAPI, loadSkillsAPI, loadJobsAPI, signUpApI } =
  signupAPIs;

function* sendEmail({ payload: email }: SimpleStringPayload) {
  try {
    yield call(sendEmailAPI, email);
    yield put({
      type: SEND_EMAIL_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SEND_EMAIL_FAILURE,
      payload: getAxiosError(err),
    });
  }
}

function* verifyEmail(action) {
  try {
    yield call(verifyEmailAPI, action.payload);
    yield put({
      type: VERIFY_EMAIL_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    yield put({
      type: VERIFY_EMAIL_FAILURE,
      payload: getAxiosError(err),
    });
  }
}

function* loadSkills() {
  try {
    const result = yield call(loadSkillsAPI);
    yield put({
      type: LOAD_SKILLS_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_SKILLS_FAILURE,
      payload: getAxiosError(err),
    });
  }
}

function* loadJobs() {
  try {
    const result = yield call(loadJobsAPI);
    yield put({
      type: LOAD_JOBS_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_JOBS_FAILURE,
      payload: getAxiosError(err),
    });
  }
}

// TODO: 함수명, ApI 수정해주세요. verify 는 데이터를 검증 및 확인하는 함수에 더 맞는 것 같습니다.
function* verifySignUp(action) {
  try {
    const result = yield call(signUpApI, action.payload);
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
