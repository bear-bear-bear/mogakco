import { put, delay, takeLatest, all, fork } from 'redux-saga/effects';
import {
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_SOCIAL_REQUEST,
  VERIFY_SOCIAL_SUCCESS,
  VERIFY_SOCIAL_FAILURE,
} from '~/redux/reducers/signup';

function* verifyEmail(action) {
  try {
    yield delay(2000);
    yield put({
      type: VERIFY_EMAIL_SUCCESS,
      email: action.payload,
    });
  } catch (err) {
    yield put({
      type: VERIFY_EMAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// const sendSignUpEmailAPI = (data) => axios.post('/user/prepare', data);
// function* sendSignUpEmail(action) {
//   try {
//     console.log('sendSignUpEmail action', action);
//     const result = yield call(sendSignUpEmailAPI, action.data);
//     console.log('result', result);
//     yield put({
//       type: VERIFY_EMAIL_SUCCESS,
//       // email: result.message,
//     });
//   } catch (err) {
//     yield put({
//       type: VERIFY_EMAIL_FAILURE,
//       error: err.response.data,
//     });
//   }
// }

function* verifySocial() {
  try {
    yield delay(1000);
    yield put({
      type: VERIFY_SOCIAL_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: VERIFY_SOCIAL_FAILURE,
      error: err.response.data,
    });
  }
}

export function* watchEmail() {
  yield takeLatest(VERIFY_EMAIL_REQUEST, verifyEmail);
}

export function* watchSocial() {
  yield takeLatest(VERIFY_SOCIAL_REQUEST, verifySocial);
}

export default function* watchAuth() {
  yield all([fork(watchEmail), fork(watchSocial)]);
}
