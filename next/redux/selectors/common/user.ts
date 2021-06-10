import { createSelector } from '@reduxjs/toolkit';

export const meSelector = createSelector(
  (state: any) => state.user.me,
  (value) => value,
);
