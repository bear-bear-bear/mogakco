import { createSelector } from 'reselect';

const selectVerifyEmailDone = state => state.signupReducer.verifyEmailDone;
const selectVerifyInfoDone = state => state.signupReducer.verifyInfoDone;

export const getVerifyEmailDone = createSelector(
  selectVerifyEmailDone,
  value => value,
);

export const getVerifyInfoDone = createSelector(
  selectVerifyInfoDone,
  value => value,
);
