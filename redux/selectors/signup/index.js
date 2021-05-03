import { createSelector } from 'reselect';

const selectExEmail = (state) => state.signUpReducer.email;
const selectVerifyEmailLoading = (state) =>
  state.signUpReducer.verifyEmailLoading;
const selectVerifyEmailDone = (state) => state.signUpReducer.verifyEmailDone;
const selectVerifySocialLoading = (state) =>
  state.signUpReducer.verifyEmailLoading;
const selectVerifySocialDone = (state) => state.signUpReducer.verifySocialDone;
const selectVerifyInfoDone = (state) => state.signUpReducer.verifyInfoDone;
const selectVerifyInterestDone = (state) =>
  state.signUpReducer.verifyInterestDone;
const selectSignUptDone = (state) => state.signUpReducer.signUpDone;

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
