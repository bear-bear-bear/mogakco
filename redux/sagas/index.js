import { all, fork } from 'redux-saga/effects';
import watchAuth from './signup/auth';
import watchInfo from './signup/info';

export default function* rootSaga() {
  yield all([fork(watchAuth), fork(watchInfo)]);
}
