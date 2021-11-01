import * as Eff from 'redux-saga/effects';
import {call, put, all} from 'redux-saga/effects';
import FirebaseServices from '../../api/firebase';
import {IUser} from '../../interfaces/store';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {
    actionResetUser,
    actionSetUser,
} from '../slice/user.slice';
import {
    actionResetRelatives,
    actionSetRelatives,
} from '../slice/relatives.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {resetPosts, setPosts} from "../slice/posts.slice";
import {errorSaga} from "./error.saga";
import {ILoginData, ISignUpData} from "../../interfaces";
import {requestSaga} from "./network.saga";
import {resetToken, setToken} from "../slice/token.slice";
import {initialUser} from "../../config";
import {sagaGetRelativesFromArray} from "./relative.saga";
import DeviceInfo from "react-native-device-info";

const takeLatest: any = Eff.takeLatest;

function* watchAuth() {
    yield takeLatest('firebase/actionSignUp', sagaSignUp);
    yield takeLatest('firebase/actionSignIn', sagaSignIn);
    yield takeLatest('firebase/deleteImages', sagaDeleteImages);
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
            endPoint: `users?email=${email}&password=${password}&userDeviceId=${DeviceInfo.getUniqueId()}`,
            method: 'GET'
        })
        if (!responseData) return false
        yield put(actionSetUser(responseData));

        // // загрузим родственников
        // const {relatives} = responseData
        // const relativesArr = yield call(sagaGetRelativesFromArray, relatives)
        // yield put(actionSetRelatives(relativesArr))
        //
        // // загрузим посты
        // // const posts = yield FirebaseServices.getPosts(responseData._id)
        // // if (posts.length > 0) yield put(setPosts(posts))
        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaLogOut() {
    try {
        yield put(actionResetUser());
        yield put(actionResetRelatives());
        yield put(resetPosts())
        yield put(resetToken())
    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaDeleteImages(action: { payload: string[] }) {
    try {
        yield all(action.payload.map(async item => {
            await FirebaseServices.deleteImage(item)
        }))
    } catch (e) {
        console.log('err', e.code);
    }
}

export {watchAuth, sagaLogOut};
