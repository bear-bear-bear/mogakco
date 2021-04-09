import { createSelector } from 'reselect';

const selectVerifyEmailDone = state => state.signupReducer.verifyEmailDone;

export const getVerifyEmailDone = createSelector(
  selectVerifyEmailDone,
  value => value,
);
