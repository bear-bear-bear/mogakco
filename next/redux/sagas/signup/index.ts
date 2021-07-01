import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import type { ISignUpUserProps } from 'typings/auth';
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
} from '@redux/reducers/signup';
import { LOG_IN_SUCCESS } from '@redux/reducers/common/user';
import { signUpAPIs } from '@lib/APIs';
import { logAxiosError } from '@lib/apiClient';
import type { Error } from '@lib/apiClient';

const { sendEmailAPI, verifyEmailAPI, loadSkillsAPI, loadJobsAPI, signUpAPI } =
  signUpAPIs;

function* sendEmail({ payload: email }: PayloadAction<string>) {
  try {
    yield call(sendEmailAPI, email);
    yield put({
      type: SEND_EMAIL_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SEND_EMAIL_FAILURE,
      payload: logAxiosError(err as Error),
    });
  }
}

function* verifyEmail({ payload: email }: PayloadAction<string>) {
  try {
    yield call(verifyEmailAPI, email);
    yield put({
      type: VERIFY_EMAIL_SUCCESS,
      payload: email,
    });
  } catch (err) {
    yield put({
      type: VERIFY_EMAIL_FAILURE,
      payload: logAxiosError(err as Error),
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
      payload: logAxiosError(err as Error),
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
      payload: logAxiosError(err as Error),
    });
  }
}

function* signUp({ payload: userInfo }: PayloadAction<ISignUpUserProps>) {
  try {
    const result = yield call(signUpAPI, userInfo);
    yield put({ type: SIGN_UP_SUCCESS });
    yield put({
      type: LOG_IN_SUCCESS,
      token: result.token,
    });
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE, error: logAxiosError(err) });
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
  yield takeLatest(SIGN_UP_REQUEST, signUp);
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
