import { takeLatest, put, delay } from 'redux-saga/effects';
// import axios from 'axios';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '~/redux/actions/SignUp/signup';

// const infoForSignUp = ({ signUpReducer }) => ({
//   email: signUpReducer.email,
//   nickname: signUpReducer.nickname,
//   password: signUpReducer.password,
//   field: signUpReducer.field,
//   job: signUpReducer.job,
// });

// const signUpApi = (data) => axios.post('/api/user', data);

function* verifySignUp() {
  try {
    // const user = yield select(infoForSignUp);
    // const result = yield call(signUpApi(user));
    yield delay(3000);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE, error: err.response.data });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, verifySignUp);
}

export default watchSignUp;
