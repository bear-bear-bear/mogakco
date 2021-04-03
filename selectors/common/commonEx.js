import { createSelector } from 'reselect';

const getInput = state => state.commonEx.input;

const makeGetInput = () => createSelector([getInput], input => input);

export default makeGetInput;
