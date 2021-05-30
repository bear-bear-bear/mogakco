import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
};

const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    SAVE_EMAIL: (state, action) => {
      state.userInfo.email = action.payload;
    },
  },
});

// 액션 크리에이터
export const { SAVE_EMAIL: saveEmail } = landingSlice.actions;

export default landingSlice.reducer;
