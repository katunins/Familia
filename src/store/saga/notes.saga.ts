import * as Eff from 'redux-saga/effects';
import {call, put,} from 'redux-saga/effects';
import {INote, IServerNote} from '../../interfaces/store';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {
    actionAddNote, actionDeleteNote,
    actionLoadNotes, actionUpdateNote,
    addNote,
    deleteNote,
    setNotes,
    updateAndConvertTempNote,
    updateNote
} from "../slice/notes.slice";
import {errorSaga} from "./error.saga";
import {_sagaUpdateNotesImages, requestSaga} from "./network.saga";
import {Image} from "react-native-image-crop-picker";
import {idGenerator, splitDataAndId, splitDataIdAndTimeStamps} from "../../helpers/utils";

const takeLatest: any = Eff.takeLatest;

function* watchNotes() {
    yield takeLatest(actionLoadNotes.type, sagaLoadNotes)
    yield takeLatest(actionAddNote.type, sagaAddNote);
    yield takeLatest(actionUpdateNote.type, sagaUpdateNote);
    yield takeLatest(actionDeleteNote.type, sagaDeleteNote);
}

export interface IActionAddNote {
    note: IServerNote
    newImages: Image[]
    deleteImages?: string[]
    callback?: () => void
}

export interface IActionUpdateNote extends IActionAddNote {
    note: INote
}

export interface IActionDeleteNote {
    note: INote
    callback?: () => void
}

function* sagaLoadNotes() {
    try {
        const notes = yield call(requestSaga, {
            endPoint: `notes`, method: 'GET'
        })
        yield put(setNotes(notes))
    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaAddNote(action: PayloadAction<IActionAddNote>) {
    try {
        yield put(actionLoaderOn());
        const {note, newImages, deleteImages, callback} = action.payload
        const tempId = idGenerator()
        yield put(addNote({
            ...note,
            _id: tempId,
            images: newImages.map(item => item.path),
            createdAt: '',
            updatedAt: ''
        }))
        let newNote = Object.assign({}, note)
        newNote.images = yield call(_sagaUpdateNotesImages, {newImages, deleteImages})
        const responseData = yield call(requestSaga, {
            endPoint: 'notes',
            method: 'POST',
            // @ts-ignore
            data: {...note, images: newNote.images}
        })
        //
        if (!responseData) return
        yield put(updateAndConvertTempNote({newNote: responseData, tempId}));
        if (callback) callback()
        yield put(actionLoaderOff());
    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaUpdateNote(action: PayloadAction<IActionUpdateNote>) {
    try {
        yield put(actionLoaderOn());
        const {note, newImages, deleteImages, callback} = action.payload
        yield put(updateNote({...note, images: [...newImages.map(item => item.path), ...note.images]}))
        const {id, data} = splitDataIdAndTimeStamps(note)
        let newNote = Object.assign({}, data)
        const uriArr = yield call(_sagaUpdateNotesImages, {newImages, deleteImages})
        newNote.images = [...uriArr, ...note.images]
        const responseData = yield call(requestSaga, {
            endPoint: 'notes',
            method: 'PATCH',
            data: {id, noteData: newNote}
        })
        if (!responseData) return
        newNote._id = id
        yield put(updateNote(newNote))
        callback && callback()
        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaDeleteNote(action: PayloadAction<IActionDeleteNote>) {
    try {
        yield put(actionLoaderOn());
        const {note, callback} = action.payload
        const {id, data} = splitDataAndId(note)
        yield put(deleteNote({id}))
        const responseData = yield call(requestSaga, {
            endPoint: 'notes',
            method: 'DELETE',
            data: {id, noteData: data}
        })
        if (!responseData) return
        callback && callback()

        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

export {watchNotes};
