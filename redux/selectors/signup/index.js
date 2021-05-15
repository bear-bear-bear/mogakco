import { createSelector } from '@reduxjs/toolkit';

const selectExEmail = (state) => state.signup.email;
const selectVerifyEmailLoading = (state) => state.signup.verifyEmailLoading;
const selectVerifyEmailDone = (state) => state.signup.verifyEmailDone;
const selectVerifySocialLoading = (state) => state.signup.verifyEmailLoading;
const selectVerifySocialDone = (state) => state.signup.verifySocialDone;
const selectVerifyInfoDone = (state) => state.signup.verifyInfoDone;
const selectVerifyInterestDone = (state) => state.signup.verifyInterestDone;
const selectSignUptDone = (state) => state.signup.signUpDone;

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
