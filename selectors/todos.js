import { createSelector } from 'reselect';

const getInput = state => {
  return state.todos.input;
};
const getTodosInfo = state => state.todos.todos;

export const makeGetInputText = () =>
  createSelector([getInput], input => input);

export const makeGetTodos = () =>
  createSelector([getTodosInfo], todos => todos);
