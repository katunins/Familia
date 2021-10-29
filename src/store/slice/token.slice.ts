import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: string = '';
const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
    resetToken: () => {
      return initialState
    },
  },
});

export const {setToken, resetToken} = tokenSlice.actions;
export default tokenSlice.reducer;
