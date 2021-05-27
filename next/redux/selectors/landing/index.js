import { createSelector } from '@reduxjs/toolkit';

export const landingEmailSelector = createSelector(
  (state) => state.landing.email,
  (value) => value,
);
