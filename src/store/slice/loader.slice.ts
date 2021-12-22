import {createSlice} from '@reduxjs/toolkit';

const initialState: boolean = false;
const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    actionLoaderOn: () => {
      return true;
    },
    actionLoaderOff: () => {
      return false;
    },
  },
});

export const {actionLoaderOn, actionLoaderOff} = loaderSlice.actions;
export default loaderSlice.reducer;
