import { createSlice } from '@reduxjs/toolkit';
import fromActionTypes from '~/lib/fromActionTypes';

const initialState = {
  me: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
};

const dummyUser = {
  id: 1, // 아이디
  username: '최은기', // 나한테만 보이는 이름
  skills: [], // 백에선 index로 관리, 프론트에선 index를 받아 문자열로 가공. 회원가입시 문자열을 인덱스로 가공하여 post
  job: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LOG_IN_REQUEST: (state) => {
      state.logInLoading = true;
      state.logInDone = false;
      state.logInError = null;
    },
    LOG_IN_SUCCESS: (state) => {
      state.logInLoading = false;
      state.logInDone = true;
      state.me = dummyUser; // TODO:  state.me = action.payload
    },
    LOG_IN_FAILURE: (state, { payload: error }) => {
      state.logInLoading = false;
      state.logInError = error;
    },
    LOG_OUT_REQUEST: (state) => {
      state.logOutLoading = true;
      state.logOutDone = false;
      state.logOutError = null;
    },
    LOG_OUT_SUCCESS: (state) => {
      state.logOutLoading = false;
      state.logOutDone = true;
      state.me = null;
    },
    LOG_OUT_FAILURE: (state, { payload: error }) => {
      state.logOutLoading = false;
      state.logOutError = error;
    },
  },
});

// 액션 타입
export const {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
} = fromActionTypes(userSlice.actions);

export default userSlice.reducer;
