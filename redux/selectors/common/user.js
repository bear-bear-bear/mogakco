import { createSelector } from '@reduxjs/toolkit';

export const meSelector = createSelector(
  (state) => state.user.me,
  (value) => value,
);
