import axios from 'axios';
import { all, fork } from 'redux-saga/effects';

import userSaga from './common/user';
import signUpSaga from './signup';

axios.defaults.baseURL = `http://localhost:8001/api`; // 로컬서버

export default function* rootSaga() {
  yield all([
    //
    fork(userSaga),
    fork(signUpSaga),
  ]);
}
