import * as Eff from 'redux-saga/effects';
import {call, put} from 'redux-saga/effects';
import {IRelative, IUser} from '../../interfaces/store';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {
    actionResetUser,
    actionSetUser,
} from '../slice/user.slice';
import {
    actionResetRelatives, actionSetRelatives,
} from '../slice/relatives.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {errorSaga} from "./error.saga";
import {ILoginData, ISignUpData} from "../../interfaces";
import {requestSaga} from "./network.saga";
import {resetToken} from "../slice/token.slice";
import {initialUser} from "../../config";
import * as querystring from "querystring";
import {resetNotes, setNotes} from "../slice/notes.slice";

const takeLatest: any = Eff.takeLatest;

function* watchAuth() {
    yield takeLatest('firebase/actionSignUp', sagaSignUp);
    yield takeLatest('firebase/actionSignIn', sagaSignIn);
    yield takeLatest('firebase/actionLogOut', sagaLogOut);
}

function* sagaSignUp(action: PayloadAction<{ data: ISignUpData }>) {
    try {

        yield put(actionLoaderOn());
        const responseData: IUser = yield call(requestSaga, {
            endPoint: 'users',
            method: 'POST',
            data: {...initialUser, ...action.payload.data}
        })

        // установим Юзера
        yield put(
            actionSetUser(responseData),
        );

        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaSignIn(action: PayloadAction<{ data: ILoginData }>) {
    try {
        yield put(actionLoaderOn());
        const {email, password} = action.payload.data
        const responseData: IUser = yield call(requestSaga, {
            endPoint: `users?email=${email}&password=${password}`,
            method: 'GET'
        })
        if (!responseData) return false
        yield put(actionSetUser(responseData));

        // загрузим родственников
        const {relatives} = responseData
        if (relatives.length > 0) {
            const relativesIds = relatives.map(item => item.id)
            const relativesArr: IRelative[] = yield call(requestSaga, {
                endPoint: `relatives?${querystring.stringify({relativesIds})}`, method: 'GET'
            })
            yield put(actionSetRelatives(relativesArr))
        }
        // загрузим посты
        const notes = yield call(requestSaga, {
            endPoint: `notes`, method: 'GET'
        })
        if (notes.length > 0) yield put(setNotes(notes))
        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaLogOut() {
    try {
        yield put(actionResetUser());
        yield put(actionResetRelatives());
        yield put(resetNotes())
        yield put(resetToken())
    } catch (error) {
        yield call(errorSaga, error)
    }
}

export {watchAuth, sagaLogOut};
