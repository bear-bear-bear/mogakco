import { createSelector } from 'reselect';

export const meSelector = createSelector(
  state => state.user.me,
  value => value,
);
