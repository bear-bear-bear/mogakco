import { all, fork } from 'redux-saga/effects';

import user from './common/user';
import signup from './signup';

export default function* rootSaga() {
  yield all([
    //
    fork(user),
    fork(signup),
  ]);
}
