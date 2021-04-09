import { all, fork } from 'redux-saga/effects';
import { watchAuth } from './signup/auth';

export default function* rootSaga() {
  yield all([fork(watchAuth)]);
}
