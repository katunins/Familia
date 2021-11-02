import * as Eff from 'redux-saga/effects';
import {call, put,} from 'redux-saga/effects';
import {INote, IServerNote} from '../../interfaces/store';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {addNote, deleteNote, updateNote} from "../slice/notes.slice";
import {errorSaga} from "./error.saga";
import {_sagaUpdateNotesImages, requestSaga} from "./network.saga";
import {Image} from "react-native-image-crop-picker";
import {splitDataAndId} from "../../helpers/utils";
import {loaderSelector} from "../selectors";

const takeLatest: any = Eff.takeLatest;

function* watchNotes() {
    yield takeLatest('notes/add', sagaAddNote);
    yield takeLatest('notes/update', sagaUpdateNote);
    yield takeLatest('notes/delete', sagaDeleteNote);
}

export interface IActionAddNote {
    note: IServerNote
    newImages?: Image[]
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

function* sagaAddNote(action: PayloadAction<IActionAddNote>) {
    try {
        yield put(actionLoaderOn());
        const {note, newImages, deleteImages, callback} = action.payload
        const images = yield call(_sagaUpdateNotesImages, {newImages})

        const responseData = yield call(requestSaga, {
            endPoint: 'notes',
            method: 'POST',
            // @ts-ignore
            data: {...note, images: images.map(item => item.path)}
        })
        //
        if (responseData) {
            yield put(addNote(responseData))
            if (callback) callback()
        }
        yield put(actionLoaderOff());
    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaUpdateNote(action: PayloadAction<IActionUpdateNote>) {
    try {
        yield put(actionLoaderOn());
        const {note, newImages, deleteImages, callback} = action.payload
        const {id, data} = splitDataAndId(note)
        const images = yield call(_sagaUpdateNotesImages, {newImages, deleteImages})

        // @ts-ignore
        const noteData = {...data, images: [...data.images, ...images.map(item => item.path)]}
        console.log('noteData', noteData)
        const responseData = yield call(requestSaga, {
            endPoint: 'notes',
            method: 'PATCH',
            data: {id, noteData}
        })
        if (responseData) {
            yield put(updateNote({_id: id, ...noteData}))
            if (callback) callback()
        }
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
        const result = yield call(requestSaga, {
            endPoint: 'notes',
            method: 'DELETE',
            data: {id, noteData: data}
        })

        if (result) {
            // удалим из стор
            yield put(deleteNote(id))
            if (callback) callback()
        }

        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

export {watchNotes};
