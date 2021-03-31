import { handleActions } from 'redux-actions';
import * as counter from '~/actions/example/counter';

// 리듀서
const counterReducer = handleActions(
  {
    [counter.INCREASE]: state => ({ num: state.num + 1 }),
    [counter.DECREASE]: state => ({ num: state.num - 1 }),
  },
  counter.initialState,
);

export default counterReducer;
