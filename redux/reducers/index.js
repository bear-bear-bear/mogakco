import { combineReducers } from 'redux';
import user from './common/user';
import signUp from './signUp';

const rootReducer = combineReducers({
  user,
  signUp,
});

export default rootReducer;
