import axios from 'axios';
// TODO: axios -> apiClient 교체 권장
// import apiClient from '~/lib/apiClient';
import { all, fork } from 'redux-saga/effects';

import user from './common/user';
import signup from './signup';

axios.defaults.baseURL = `http://localhost:8001/api`; // 로컬서버

export default function* rootSaga() {
  yield all([
    //
    fork(user),
    fork(signup),
  ]);
}
