import * as Eff from 'redux-saga/effects';
import {call, put, select} from 'redux-saga/effects';
import FirebaseServices from '../../api/firebase';
import {IRelativeIndex, IRelativeTypes, IUser} from '../../interfaces/store';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {actionSetUser} from '../slice/user.slice';
import {needToUpload, splitUserId} from '../../helpers/utils';
import {requestSaga} from "./network.saga";
import {errorSaga} from "./error.saga";
import {ISaveUserCallback} from "../../screens/userScreen";
import {userSelector} from "../selectors";

const takeLatest: any = Eff.takeLatest;

function* watchUser() {
    yield takeLatest('user/update', sagaUserUpdate);
    yield takeLatest('user/updateRelative', sagaUserUpdateRelativeType)
}

/**
 * Сага отслеживает изменение параметра пользователя и сохраняет изменения в Firebase
 * @param action
 */
function* sagaUserUpdate(action: PayloadAction<ISaveUserCallback>) {
    try {
        yield put(actionLoaderOn());
        const {callBack} = action.payload
        const {id, userData} = yield splitUserId(action.payload.userData)
        // const uploadUrl = yield needToUpload({
        //     userPic: userData.userPic, id
        // });
        // if (uploadUrl) userData.userPic = uploadUrl;

        const responseData = yield call(requestSaga, {
            endPoint: 'users/update',
            data: {id, userData}
        })

        if (responseData) {
            yield put(actionSetUser(action.payload.userData));
            callBack()
        }

        yield put(actionLoaderOff());
    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaUserUpdateRelativeType(action: PayloadAction<IRelativeIndex>) {
    try {
        yield put(actionLoaderOn());
        const newRelativeIndex = action.payload
        const user: IUser = yield select(userSelector)
        const newUserRelatives = user.relatives.map(item => item.id === newRelativeIndex.id ? newRelativeIndex : item)
        // @ts-ignore
        yield call(sagaUserUpdate, {
            payload: {
                userData: {...user, relatives: newUserRelatives},
                callBack: () => {
                }
            }
        })
        yield put(actionLoaderOff());
    } catch (error) {
        yield call(errorSaga, error)
    }
}

export {watchUser, sagaUserUpdate};
