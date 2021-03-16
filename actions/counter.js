import { createAction } from 'redux-actions';

export const initialState = {
  num: 0,
};

// 액션
export const INCREASE = 'count/INCREASE';
export const DECREASE = 'count/DECREASE';

// 액션 크리에이터
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
