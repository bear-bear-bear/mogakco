import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@redux/store/configureStore';

export const meSelector = createSelector(
  (state: RootState) => state.user.me,
  (value) => value,
);
