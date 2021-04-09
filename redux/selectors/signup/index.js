import { createSelector } from 'reselect';

const selectVerifyAuthDone = state => state.signupReducer.verifyAuthDone;
const selectVerifyInfoDone = state => state.signupReducer.verifyInfoDone;
const selectVerifyInterestDone = state =>
  state.signupReducer.verifyInterestDone;

export const getVerifyAuthDone = createSelector(
  selectVerifyAuthDone,
  value => value,
);

export const getVerifyInfoDone = createSelector(
  selectVerifyInfoDone,
  value => value,
);

export const getVerifyInterestDone = createSelector(
  selectVerifyInterestDone,
  value => value,
);
