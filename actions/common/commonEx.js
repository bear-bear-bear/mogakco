import { createAction } from 'redux-actions';

export const initialState = {
  input: '',
};

// 액션
export const CHANGE_INPUT = 'commonEx/CHANGE_INPUT';

// 액션 크리에이터
export const changeInput = createAction(CHANGE_INPUT, input => input);
