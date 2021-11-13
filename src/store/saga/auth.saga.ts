import * as Eff from 'redux-saga/effects';
import {call, put} from 'redux-saga/effects';
import {IUser} from '../../interfaces/store';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {actionLoadRelatives, resetRelatives} from '../slice/relatives.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {errorSaga} from "./error.saga";
import {ILoginData, ISignUpData} from "../../interfaces";
import {requestSaga} from "./network.saga";
import {resetToken} from "../slice/token.slice";
import {initialUser} from "../../config";
import {actionLoadNotes, resetNotes} from "../slice/notes.slice";
import {actionCheckAuth, actionLogOut, actionSignIn, actionSignUp, resetUser, setUser} from "../slice/user.slice";

const takeLatest: any = Eff.takeLatest;

function* watchAuth() {
    yield takeLatest(actionSignUp.type, sagaSignUp);
    yield takeLatest(actionSignIn.type, sagaSignIn);
    yield takeLatest(actionLogOut.type, sagaLogOut);
    yield takeLatest(actionCheckAuth.type, sagaCheckAuth)
}

function* sagaCheckAuth() {
    try {

        yield put(actionLoaderOn());
        const responseData: IUser = yield call(requestSaga, {
            endPoint: 'auth',
            method: 'GET',
        })
        yield put(actionLoaderOff());
    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaSignUp(action: PayloadAction<{ data: ISignUpData }>) {
    try {

        yield put(actionLoaderOn());
        const responseData: IUser = yield call(requestSaga, {
            endPoint: 'users',
            method: 'POST',
            data: {...initialUser, ...action.payload.data}
        })
        if (!responseData) return
        yield put(
            setUser(responseData),
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
        if (!responseData) return

        yield put(setUser(responseData));

        yield put(actionLoadRelatives(responseData.relatives))
        yield put(actionLoadNotes())

        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaLogOut() {
    try {
        yield put(resetUser());
        yield put(resetRelatives());
        yield put(resetNotes())
        yield put(resetToken())
    } catch (error) {
        yield call(errorSaga, error)
    }
}

export {watchAuth, sagaLogOut};
