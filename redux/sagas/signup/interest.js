import { takeLatest, delay, put } from 'redux-saga/effects';
import {
  VERIFY_INTEREST_REQUEST,
  VERIFY_INTEREST_SUCCESS,
  VERIFY_INTEREST_FAILURE,
} from '~/redux/actions/signup/interest';

function* verifyInterest() {
  try {
    yield delay(1000);
    yield put({ type: VERIFY_INTEREST_SUCCESS });
  } catch (err) {
    yield put({ type: VERIFY_INTEREST_FAILURE, error: err.response.data });
  }
}

function* watchInterest() {
  yield takeLatest(VERIFY_INTEREST_REQUEST, verifyInterest);
}

export default watchInterest;
