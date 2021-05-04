import { createSlice } from '@reduxjs/toolkit';
import actionTypesFrom from '~/lib/actionTypesFrom';

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
  privateName: '최은기', // 나한테만 보이는 이름
  publicName: '라이언', // 방 들어갈때 랜덤  부여
  skills: [], // 백에선 index로 관리, 프론트에선 index를 받아 문자열로 가공. 회원가입시 문자열을 인덱스로 가공하여 post
  job: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LOGIN_REQUEST: (state) => {
      state.logInLoading = true;
      state.logInDone = false;
      state.logInError = null;
    },
    LOGIN_SUCCESS: (state) => {
      state.logInLoading = false;
      state.logInDone = true;
      state.me = dummyUser; // TODO:  state.me = action.payload
    },
    LOGIN_FAILURE: (state, { payload: error }) => {
      state.logInLoading = false;
      state.logInError = error;
    },
    LOGOUT_REQUEST: (state) => {
      state.logOutLoading = true;
      state.logOutDone = false;
      state.logOutError = null;
    },
    LOGOUT_SUCCESS: (state) => {
      state.logOutLoading = false;
      state.logOutDone = true;
      state.me = null;
    },
    LOGOUT_FAILURE: (state, { payload: error }) => {
      state.logOutLoading = false;
      state.logOutError = error;
    },
  },
});

// 액션 타입
export const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} = actionTypesFrom(userSlice.actions);

export default userSlice.reducer;
