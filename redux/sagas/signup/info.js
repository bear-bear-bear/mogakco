import { takeLatest, put } from 'redux-saga/effects';
import {
  VERIFY_INFO_REQUEST,
  VERIFY_INFO_SUCCESS,
  VERIFY_INFO_FAILURE,
} from '~/redux/reducers/signUp';

function* verifyInfo({ payload }) {
  try {
    yield put({
      type: VERIFY_INFO_SUCCESS,
      nickname: payload.nickname,
      password: payload.password,
    });
  } catch (err) {
    yield put({ type: VERIFY_INFO_FAILURE, error: err.response.data });
  }
}

function* watchInfo() {
  yield takeLatest(VERIFY_INFO_REQUEST, verifyInfo);
}

export default watchInfo;
