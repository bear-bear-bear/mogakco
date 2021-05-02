import produce from 'immer';
import { handleActions } from 'redux-actions';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '~/redux/actions/common/user';

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

const user = handleActions(
  {
    [LOGIN_REQUEST]: state =>
      produce(state, draft => {
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
      }),
    // eslint-disable-next-line no-unused-vars
    [LOGIN_SUCCESS]: (state, { payload: me }) =>
      produce(state, draft => {
        draft.logInLoading = false;
        draft.logInDone = true;
        // draft.me = me;
        draft.me = dummyUser;
      }),
    [LOGIN_FAILURE]: (state, { payload: error }) =>
      produce(state, draft => {
        draft.logInLoading = false;
        draft.logInError = error;
      }),
    [LOGOUT_REQUEST]: state =>
      produce(state, draft => {
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
      }),
    [LOGOUT_SUCCESS]: state =>
      produce(state, draft => {
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
      }),
    [LOGOUT_FAILURE]: (state, { payload: error }) =>
      produce(state, draft => {
        draft.logOutLoading = false;
        draft.logOutError = error;
      }),
  },
  initialState,
);

export default user;
