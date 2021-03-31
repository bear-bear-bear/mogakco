import { handleActions } from 'redux-actions';
import * as Ex from '~/actions/common/commonEx';

// 리듀서
const commonExReducer = handleActions(
  {
    [Ex.CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload,
    }),
  },
  Ex.initialState,
);

export default commonExReducer;
