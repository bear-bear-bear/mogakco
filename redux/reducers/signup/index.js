import { handleActions } from 'redux-actions';
import produce from 'immer';
import {
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
} from '~/redux/actions/signup/auth';

const initialState = {
  verifyEmailLoading: false,
  verifyEmailDone: false,
  verifyEmailError: null,
};

const signupReducer = handleActions(
  {
    [VERIFY_EMAIL_REQUEST]: state =>
      produce(state, draft => {
        draft.verifyEmailLoading = true;
        draft.verifyEmailDone = false;
        draft.verifyEmailError = null;
      }),
    [VERIFY_EMAIL_SUCCESS]: state =>
      produce(state, draft => {
        draft.verifyEmailLoading = false;
        draft.verifyEmailDone = true;
      }),
    [VERIFY_EMAIL_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.verifyEmailLoading = false;
        draft.verifyEmailError = action.error;
      }),
  },
  initialState,
);

export default signupReducer;
