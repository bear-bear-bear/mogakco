import { all, fork } from 'redux-saga/effects';

import watchAuth from './auth';
import watchInfo from './info';
import watchInterest from './interest';
import watchSignUp from './signup';

export default function* signUpSaga() {
  yield all([
    fork(watchAuth),
    fork(watchInfo),
    fork(watchInterest),
    fork(watchSignUp),
  ]);
}
