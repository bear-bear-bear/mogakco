import { createSelector } from '@reduxjs/toolkit';

const selectExEmail = ({ signup }) => signup.email;
const selectSendEmailDone = ({ signup }) => signup.sendEmailDone;
const selectVerifyEmailDone = ({ signup }) => signup.verifyEmailDone;
const selectVerifySocialLoading = ({ signup }) => signup.verifySocialLoading;
const selectVerifySocialDone = ({ signup }) => signup.verifySocialDone;
const selectSaveRequiredInfoDone = ({ signup }) => signup.saveRequiredInfoDone;
const selectSaveOptionalInfoDone = ({ signup }) => signup.saveOptionalInfoDone;
const selectSignUpDone = ({ signup }) => signup.signUpDone;

export const getExEmail = createSelector(selectExEmail, (value) => value);

export const getSendEmailDone = createSelector(
  selectSendEmailDone,
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

export const getSaveRequiredInfoDone = createSelector(
  selectSaveRequiredInfoDone,
  (value) => value,
);

export const getSaveOptionalInfoDone = createSelector(
  selectSaveOptionalInfoDone,
  (value) => value,
);

export const getSignUpDone = createSelector(selectSignUpDone, (value) => value);
