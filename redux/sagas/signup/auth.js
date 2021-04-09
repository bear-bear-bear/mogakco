import { put, delay, takeLatest } from 'redux-saga/effects';
import {
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
} from '~/redux/actions/signup/auth';

function* verifyEmail() {
  try {
    yield delay(1000);
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

export default function* watchAuth() {
  yield takeLatest(VERIFY_EMAIL_REQUEST, verifyEmail);
}
