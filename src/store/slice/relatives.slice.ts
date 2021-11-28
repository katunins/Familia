import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRelative, IRelativeIndex} from '../../interfaces/store';
import {ISaveRelativeCallback} from "../../screens/relatives/relativeFormScreen";

export const actionUpdateRelative = createAction(
    '_relatives/updateRelative',
    function prepare(payload: ISaveRelativeCallback) {
        return {
            payload,
        };
    },
);

export const actionAddRelative = createAction(
    '_relatives/addRelative',
    function prepare(payload: ISaveRelativeCallback) {
        return {
            payload,
        };
    },
);

export const actionDeleteRelative = createAction(
    '_relatives/deleteRelative',
    function prepare(payload: IRelative) {
        return {
            payload,
        };
    },
);

export const actionLoadRelatives = createAction('_relatives/load');
const initialState: IRelative[] = [];

const relativesSlice = createSlice({
    name: 'relatives',
    initialState,
    reducers: {
        setRelatives: (state, action: PayloadAction<IRelative[]>) => {
            return action.payload;
        },
        addRelative: (state, action: PayloadAction<IRelative>) => {
            return [...state, action.payload];
        },
        updateRelative: (state, action: PayloadAction<IRelative>) => {
            return state.map((item => item._id === action.payload._id ? action.payload : item))
        },
        updateAndConvertTempRelative: (state, action: PayloadAction<{ newRelative: IRelative, tempId: string }>) => {
            return state.map((item => item._id === action.payload.tempId ? action.payload.newRelative : item))
        },
        deleteRelative: (state, action: PayloadAction<{ id: string }>) => {
            return state.filter(item => item._id !== action.payload.id);
        },
        resetRelatives: () => {
            return initialState;
        },
    },
});

export const {
    resetRelatives,
    setRelatives,
    addRelative,
    deleteRelative,
    updateRelative,
    updateAndConvertTempRelative
} = relativesSlice.actions;
export default relativesSlice.reducer;
