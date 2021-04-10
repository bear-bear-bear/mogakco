import { put, delay, takeLatest, all, fork } from 'redux-saga/effects';
import {
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_SOCIAL_REQUEST,
  VERIFY_SOCIAL_SUCCESS,
  VERIFY_SOCIAL_FAILURE,
} from '~/redux/actions/signup/auth';

function* verifyEmail() {
  try {
    yield delay(5000);
    yield put({
      type: VERIFY_EMAIL_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: VERIFY_EMAIL_FAILURE,
      error: err.response.data,
    });
  }
}

function* verifySocial() {
  try {
    yield delay(1000);
    yield put({
      type: VERIFY_SOCIAL_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: VERIFY_SOCIAL_FAILURE,
      error: err.response.data,
    });
  }
}

export function* watchEmail() {
  yield takeLatest(VERIFY_EMAIL_REQUEST, verifyEmail);
}

export function* watchSocial() {
  yield takeLatest(VERIFY_SOCIAL_REQUEST, verifySocial);
}

export default function* watchAuth() {
  yield all([fork(watchEmail), fork(watchSocial)]);
}
