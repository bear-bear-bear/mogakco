import { combineReducers } from 'redux';
import signupReducer from './SignUp';

const rootReducer = combineReducers({ signupReducer });

export default rootReducer;
