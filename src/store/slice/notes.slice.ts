import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {INote} from "../../interfaces/store";
import {IActionAddNote, IActionDeleteNote} from "../saga/notes.saga";

export const actionAddNote = createAction(
    '_notes/add',
    function prepare(payload: IActionAddNote) {
        return {
            payload,
        };
    },
);
export const actionUpdateNote = createAction(
    '_notes/update',
    function prepare(payload: IActionAddNote) {
        return {
            payload,
        };
    },
);
export const actionDeleteNote = createAction(
    '_notes/delete',
    function prepare(payload: IActionDeleteNote) {
        return {
            payload,
        };
    },
);
export const actionLoadNotes = createAction('_notes/load');


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
        updateAndConvertTempNote: (state, action: PayloadAction<{ newNote: INote, tempId: string }>) => {
            return state.map((item => item._id === action.payload.tempId ? action.payload.newNote : item))
        },
        deleteNote:(state, action: PayloadAction<{ id: string }>) => {
            return state.filter(item=>item._id !== action.payload.id)
        },
        resetNotes: () => {
            return initialState;
        },
    },
});

export const {addNote, resetNotes, setNotes, updateNote, updateAndConvertTempNote, deleteNote} = notesSlice.actions;
export default notesSlice.reducer;
