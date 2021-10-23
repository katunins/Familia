import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRelative, IUser} from '../../interfaces/store';

export const actionUserChange = createAction(
  'user/userChange',
  function prepare(payload: {userData:IUser | IRelative}) {
    return {
      payload,
    };
  },
);

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    actionSetUser: (state, action: PayloadAction<IUser>) => {
      return action.payload;
    },
    // actionChangeUser: (state, action: PayloadAction<IUser>) => {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // },
    actionResetUser: () => {
      return initialState;
    },
  },
});

export const {actionResetUser, actionSetUser} = userSlice.actions;
export default userSlice.reducer;
