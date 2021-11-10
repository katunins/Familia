import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../interfaces/store';
import {ISaveUserCallback} from "../../screens/userScreen";
import {ILoginData, ISignUpData} from "../../interfaces";

export const actionUserUpdate = createAction(
    '_user/update',
    function prepare(payload: ISaveUserCallback) {
        return {
            payload,
        };
    },
);

export const actionSignIn = createAction(
    '_actionSignIn',
    function prepare(payload: { data: ILoginData }) {
        return {
            payload,
        };
    },
);

export const actionSignUp = createAction(
    '_actionSignUp',
    function prepare(payload: { data: ISignUpData }) {
        return {
            payload,
        };
    },
);

export const actionLogOut = createAction(
    '_actionLogOut'
);

const initialState = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            return action.payload;
        },
        resetUser: () => {
            return initialState;
        }
    },
});

export const {setUser, resetUser} = userSlice.actions;
export default userSlice.reducer;
