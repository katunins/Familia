import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITreeRelative} from "../../interfaces/store";

interface IInitialState {}

const initialState: IInitialState = {};

const rootUserSlice = createSlice({
    name: 'rootUser',
    initialState,
    reducers: {
        setRootUser: (state, action: PayloadAction<ITreeRelative>) => {
            return action.payload
        },
    },
});

export const {setRootUser} = rootUserSlice.actions;
export default rootUserSlice.reducer;
