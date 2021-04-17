import { createSelector } from 'reselect';

const selectExEmail = state => state.signupReducer.email;
const selectVerifyEmailLoading = state =>
  state.signupReducer.verifyEmailLoading;
const selectVerifyEmailDone = state => state.signupReducer.verifyEmailDone;
const selectVerifySocialLoading = state =>
  state.signupReducer.verifyEmailLoading;
const selectVerifySocialDone = state => state.signupReducer.verifySocialDone;
const selectVerifyInfoDone = state => state.signupReducer.verifyInfoDone;
const selectVerifyInterestDone = state =>
  state.signupReducer.verifyInterestDone;
const selectSignUptDone = state => state.signupReducer.signUpDone;

export const getExEmail = createSelector(selectExEmail, value => value);

export const getVerifyEmailLoading = createSelector(
  selectVerifyEmailLoading,
  value => value,
);

export const getVerifyEmailDone = createSelector(
  selectVerifyEmailDone,
  value => value,
);

export const getVerifySocialLoading = createSelector(
  selectVerifySocialLoading,
  value => value,
);

export const getVerifySocialDone = createSelector(
  selectVerifySocialDone,
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

export const getSignUpDone = createSelector(selectSignUptDone, value => value);
