import { combineReducers } from 'redux';
import signUpReducer from './SignUp';

const rootReducer = combineReducers({ signUpReducer });

export default rootReducer;
