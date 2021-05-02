import { combineReducers } from 'redux';
import signUpReducer from './SignUp';
import user from './common/user';

const rootReducer = combineReducers({
  user,
  signUpReducer,
});

export default rootReducer;
