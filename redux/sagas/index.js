import { all, fork } from 'redux-saga/effects';
import watchAuth from './SignUp/auth';
import watchInfo from './SignUp/info';
import watchInterest from './SignUp/interest';

export default function* rootSaga() {
  yield all([fork(watchAuth), fork(watchInfo), fork(watchInterest)]);
}
