import { createSelector } from 'reselect';

const getNum = state => state.counter.num;

const makeGetCounter = () => createSelector([getNum], num => num);

export default makeGetCounter;
