import { combineReducers } from 'redux';

import user from './common/user';
import signup from './signup';
import landing from './landing';

const rootReducer = combineReducers({
  user,
  landing,
  signup,
});

export default rootReducer;
