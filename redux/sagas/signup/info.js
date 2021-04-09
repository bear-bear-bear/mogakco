import { takeLatest, delay, put } from 'redux-saga/effects';
import {
  VERIFY_INFO_REQUEST,
  VERIFY_INFO_SUCCESS,
  VERIFY_INFO_FAILURE,
} from '~/redux/actions/signup/info';

function* verifyInfo() {
  try {
    yield delay(1000);
    yield put({ type: VERIFY_INFO_SUCCESS });
  } catch (err) {
    yield put({ type: VERIFY_INFO_FAILURE, error: err.response.data });
  }
}

function* watchInfo() {
  yield takeLatest(VERIFY_INFO_REQUEST, verifyInfo);
}

export default watchInfo;
