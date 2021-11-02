import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRelative} from '../../interfaces/store';
import {ISaveRelativeCallback} from "../../screens/relativeFormScreen";


export const actionNewRelative = createAction(
    'relatives/newRelative',
    function prepare(payload: ISaveRelativeCallback) {
        return {
            payload,
        };
    },
);

export const actionUpdateRelative = createAction(
    'relatives/updateRelative',
    function prepare(payload: ISaveRelativeCallback) {
        return {
            payload,
        };
    },
);

export const actionToDeleteRelative = createAction(
    'relatives/deleteRelative',
    function prepare(payload: IRelative) {
        return {
            payload,
        };
    },
);
const initialState: IRelative[] = [];

const relativesSlice = createSlice({
    name: 'relatives',
    initialState,
    reducers: {
        actionSetRelatives: (state, action: PayloadAction<IRelative[]>) => {
            return action.payload;
        },
        actionAddRelative: (state, action: PayloadAction<IRelative>) => {
            return [...state, action.payload];
        },
        actionUpdateStateRelative: (state, action: PayloadAction<IRelative>) => {
            return state.map((item => item._id === action.payload._id ? action.payload : item))
            // return [...state, action.payload];
        },
        actionDeleteRelative: (state, action: PayloadAction<{ id: string }>) => {
            return state.filter(item => item._id !== action.payload.id);
        },
        actionResetRelatives: () => {
            return initialState;
        },
    },
});

export const {
    actionResetRelatives,
    actionSetRelatives,
    actionAddRelative,
    actionDeleteRelative,
    actionUpdateStateRelative
} = relativesSlice.actions;
export default relativesSlice.reducer;
