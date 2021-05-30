import { put, delay, takeLatest, all, fork, call } from 'redux-saga/effects';
import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '~/redux/reducers/signup';
import apiClient, { getAxiosError } from '~/lib/apiClient';

// 인증 이메일 전송
// 인증 이메일에서 /signup으로 리다이렉션 시에, localStorage 안의 이메일로 이메일 검증여부 확인
// 회원가입 완료시 입력한 정보들 모아서 회원가입 요청

const sendEmailAPI = (email) =>
  apiClient.post('/api/user/send-token/before-register', { email });
function* sendEmail(action) {
  try {
    yield call(sendEmailAPI, action.payload);
    yield put({
      type: SEND_EMAIL_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SEND_EMAIL_FAILURE,
      error: getAxiosError(err),
    });
  }
}

const verifyEmailAPI = (email) =>
  apiClient.get(`/api/user/is-verified/before-register?email=${email}`);
function* verifyEmail(action) {
  try {
    yield call(verifyEmailAPI, action.payload);
    yield put({
      type: VERIFY_EMAIL_SUCCESS,
      email: action.payload,
    });
  } catch (err) {
    yield put({
      type: VERIFY_EMAIL_FAILURE,
      error: getAxiosError(err),
    });
  }
}

// const infoForSignUp = ({ signUpReducer }) => ({
//   email: signUpReducer.email,
//   nickname: signUpReducer.nickname,
//   password: signUpReducer.password,
//   field: signUpReducer.field,
//   job: signUpReducer.job,
// });

// const signUpApi = (data) => apiClient.post('/api/user', data);
function* verifySignUp() {
  try {
    // const user = yield select(infoForSignUp);
    // const result = yield call(signUpApi(user));
    yield delay(3000);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE, error: getAxiosError(err) });
  }
}

function* watchSendEmail() {
  yield takeLatest(SEND_EMAIL_REQUEST, sendEmail);
}

function* watchVerifyEmail() {
  yield takeLatest(VERIFY_EMAIL_REQUEST, verifyEmail);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, verifySignUp);
}

export default function* signUpSaga() {
  yield all([
    //
    fork(watchSendEmail),
    fork(watchVerifyEmail),
    fork(watchSignUp),
  ]);
}
