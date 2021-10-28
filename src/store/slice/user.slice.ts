import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRelative, IRelativeIndex, IUser} from '../../interfaces/store';

export const actionUserUpdate = createAction(
  'user/update',
  function prepare(payload: {userData:IUser | IRelative, callBack: ()=>void}) {
    return {
      payload,
    };
  },
);

export const actionUserRelativeUpdate = createAction(
    'user/updateRelative',
    function prepare(payload: IRelativeIndex) {
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
