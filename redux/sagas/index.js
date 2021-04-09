import { all, fork } from 'redux-saga/effects';
import watchAuth from './signup/auth';
import watchInfo from './signup/info';
import watchInterest from './signup/interest';

export default function* rootSaga() {
  yield all([fork(watchAuth), fork(watchInfo), fork(watchInterest)]);
}
