import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {INote} from "../../interfaces/store";
import {IActionAddNote, IActionDeleteNote} from "../saga/notes.saga";

export const actionAddNote = createAction(
    'notes/add',
    function prepare(payload: IActionAddNote) {
        return {
            payload,
        };
    },
);
export const actionUpdateNote = createAction(
    'notes/update',
    function prepare(payload: IActionAddNote) {
        return {
            payload,
        };
    },
);
export const actionDeleteNote = createAction(
    'notes/delete',
    function prepare(payload: IActionDeleteNote) {
        return {
            payload,
        };
    },
);

const initialState: INote[] = [];

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, action: PayloadAction<INote[]>) => {
            return action.payload
        },
        addNote: (state, action: PayloadAction<INote>) => {
            return [...state, action.payload]
        },
        updateNote:(state, action: PayloadAction<INote>) => {
            return state.map(item=>item._id === action.payload._id ? action.payload : item)
        },
        deleteNote:(state, action: PayloadAction<string>) => {
            return state.filter(item=>item._id !== action.payload)
        },
        resetNotes: () => {
            return initialState;
        },
    },
});

export const {addNote, resetNotes, setNotes, updateNote, deleteNote} = notesSlice.actions;
export default notesSlice.reducer;
