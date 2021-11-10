import * as Eff from 'redux-saga/effects';
import {call, put} from 'redux-saga/effects';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {splitDataAndId} from '../../helpers/utils';
import {_sagaNewUserPic, requestSaga} from "./network.saga";
import {errorSaga} from "./error.saga";
import {ISaveUserCallback} from "../../screens/userScreen";
import {actionUserUpdate, setUser} from "../slice/user.slice";

const takeLatest: any = Eff.takeLatest;

function* watchUser() {
    yield takeLatest(actionUserUpdate.type, sagaUserUpdate);
}

function* sagaUserUpdate(action: PayloadAction<ISaveUserCallback>) {
    try {
        yield put(actionLoaderOn());
        const {callBack, userData, newImage} = action.payload
        yield put(setUser(userData));
        const {id, data} = yield splitDataAndId(userData)
        let newUserData = Object.assign({}, data)
        newUserData.userPic = yield call(_sagaNewUserPic, {newImage, userPic: userData.userPic})
        const responseData = yield call(requestSaga, {
            endPoint: 'users',
            method: 'PATCH',
            data: {id, userData: newUserData}
        })
        if (!responseData) return
        newUserData._id = id
        yield put(setUser(newUserData));
        callBack && callBack(newUserData)
        yield put(actionLoaderOff());
    } catch
        (error) {
        yield call(errorSaga, error)
    }
}

export {watchUser, sagaUserUpdate};
