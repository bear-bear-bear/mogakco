import { HYDRATE } from 'next-redux-wrapper';
import type { ReducersMapObject, AnyAction } from 'redux';
import { Slice, combineReducers } from '@reduxjs/toolkit';

import userSlice from './common/user';
import signUpSlice from './signup';
import landingSlice from './landing';

const getReducerMapObject = (...slices: Slice[]) =>
  slices.reduce((acc: ReducersMapObject, currSlice) => {
    acc[currSlice.name] = currSlice.reducer;
    return acc;
  }, {});

const reducerMapObject = getReducerMapObject(
  userSlice,
  signUpSlice,
  landingSlice,
);

export const reducer = (state = {}, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return combineReducers(reducerMapObject)(state, action);
};

export default reducer;
