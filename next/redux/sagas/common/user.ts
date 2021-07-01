import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import type { ILoginProps } from 'typings/auth';
import { logAxiosError } from '@lib/apiClient';
import { logInFetcher, logOutFetcher } from '@lib/fetchers';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
} from '@redux/reducers/common/user';

function* logIn(action: PayloadAction<ILoginProps>) {
  try {
    const result = yield call(logInFetcher, action.payload);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    // console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: logAxiosError(err),
    });
  }
}

function* logOut() {
  try {
    const result = yield call(logOutFetcher);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    // console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: logAxiosError(err),
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
