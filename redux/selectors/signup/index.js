import { createSelector } from '@reduxjs/toolkit';

const selectExEmail = (state) => state.signUp.email;
const selectVerifyEmailLoading = (state) => state.signUp.verifyEmailLoading;
const selectVerifyEmailDone = (state) => state.signUp.verifyEmailDone;
const selectVerifySocialLoading = (state) => state.signUp.verifyEmailLoading;
const selectVerifySocialDone = (state) => state.signUp.verifySocialDone;
const selectVerifyInfoDone = (state) => state.signUp.verifyInfoDone;
const selectVerifyInterestDone = (state) => state.signUp.verifyInterestDone;
const selectSignUptDone = (state) => state.signUp.signUpDone;

export const getExEmail = createSelector(selectExEmail, (value) => value);

export const getVerifyEmailLoading = createSelector(
  selectVerifyEmailLoading,
  (value) => value,
);

export const getVerifyEmailDone = createSelector(
  selectVerifyEmailDone,
  (value) => value,
);

export const getVerifySocialLoading = createSelector(
  selectVerifySocialLoading,
  (value) => value,
);

export const getVerifySocialDone = createSelector(
  selectVerifySocialDone,
  (value) => value,
);

export const getVerifyInfoDone = createSelector(
  selectVerifyInfoDone,
  (value) => value,
);

export const getVerifyInterestDone = createSelector(
  selectVerifyInterestDone,
  (value) => value,
);

export const getSignUpDone = createSelector(
  selectSignUptDone,
  (value) => value,
);
