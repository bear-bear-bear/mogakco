import { takeLatest, put } from 'redux-saga/effects';
import {
  VERIFY_INTEREST_REQUEST,
  VERIFY_INTEREST_SUCCESS,
  VERIFY_INTEREST_FAILURE,
  SIGN_UP_REQUEST,
} from '~/redux/reducers/signUp';

function* verifyInterest({ payload }) {
  try {
    yield put({
      type: VERIFY_INTEREST_SUCCESS,
      field: payload.field,
      job: payload.job,
    });
    yield put({ type: SIGN_UP_REQUEST });
  } catch (err) {
    yield put({ type: VERIFY_INTEREST_FAILURE, error: err.response.data });
  }
}

function* watchInterest() {
  yield takeLatest(VERIFY_INTEREST_REQUEST, verifyInterest);
}

export default watchInterest;
