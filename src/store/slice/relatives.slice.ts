import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRelative, IRelativeTypes} from '../../interfaces/store';

export interface IActionNewRelative {
    userData: IRelative;
    creatorData: {
        type: IRelativeTypes["type"];
        creatorId: string;
    };
    // callBack?: () => void;
}

export const actionNewRelative = createAction(
    'relatives/newRelative',
    function prepare(payload: IActionNewRelative) {
        return {
            payload,
        };
    },
);

export const actionUpdateRelative = createAction(
    'relatives/updateRelative',
    function prepare(payload: IActionNewRelative) {
        return {
            payload,
        };
    },
);

export const actionToDeleteRelative = createAction(
    'relatives/deleteRelative',
    function prepare(payload: string) {
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
            return state.map((item => item.id === action.payload.id ? action.payload : item))
            // return [...state, action.payload];
        },
        actionDeleteRelative: (state, action: PayloadAction<string>) => {
            return state.filter(item => item.id !== action.payload);
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
