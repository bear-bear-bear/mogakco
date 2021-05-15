import { combineReducers } from 'redux';
import user from './common/user';
import signup from './signup';

const rootReducer = combineReducers({
  user,
  signup,
});

export default rootReducer;
