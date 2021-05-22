import { combineReducers } from 'redux';
import user from './common/user';
import signUp from './signup';

const rootReducer = combineReducers({
  user,
  signUp,
});

export default rootReducer;
