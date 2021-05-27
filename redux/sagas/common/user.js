import axios from 'axios';
import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
} from '../../reducers/common/user';
import { getAxiosError } from '~/lib/apiClient';

const logInAPI = (data) => axios.post('/user/login', data);
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    // console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: getAxiosError(err),
    });
  }
}

const logOutAPI = () => axios.get('/user/logout');
function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    // console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: getAxiosError(err),
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([
    //
    fork(watchLogIn),
    fork(watchLogOut),
  ]);
}
