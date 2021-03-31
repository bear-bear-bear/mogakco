import { combineReducers } from 'redux';
import counter from './example/counter';
import todos from './example/todos';
import commonEx from './common/commonEx';

const rootReducer = combineReducers({
  counter,
  todos,
  commonEx,
});

export default rootReducer;
