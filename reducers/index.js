import { combineReducers } from 'redux';
import counter from './example.counter';
import todos from './example.todos';

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
