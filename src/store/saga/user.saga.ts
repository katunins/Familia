import * as Eff from 'redux-saga/effects';
import {call, put, select} from 'redux-saga/effects';
import FirebaseServices from '../../api/firebase';
import {IRelativeIndex, IRelativeTypes, IUser} from '../../interfaces/store';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {actionSetUser} from '../slice/user.slice';
import {needToUpload, splitDataAndId} from '../../helpers/utils';
import {_sagaNewUserPic, requestSaga, uploadSaga} from "./network.saga";
import {errorSaga} from "./error.saga";
import {ISaveUserCallback} from "../../screens/userScreen";
import {userSelector} from "../selectors";

const takeLatest: any = Eff.takeLatest;

function* watchUser() {
    yield takeLatest('user/update', sagaUserUpdate);
}

function* sagaUserUpdate(action: PayloadAction<ISaveUserCallback>) {
    try {
        yield put(actionLoaderOn());
        const {callBack, newImage} = action.payload
        const {id, data} = yield splitDataAndId(action.payload.userData)

        const requestData = yield call(_sagaNewUserPic, {newImage, userData: data})
        const responseData = yield call(requestSaga, {
            endPoint: 'users',
            method: 'PATCH',
            data: {id, userData: requestData}
        })
        if (responseData) {
            const newUserData = {...requestData, _id: id}
            yield put(actionSetUser({...requestData, _id: id}));
            if (callBack) callBack(newUserData)
        }

        yield put(actionLoaderOff());
    } catch
        (error) {
        yield call(errorSaga, error)
    }
}

export {watchUser, sagaUserUpdate};
