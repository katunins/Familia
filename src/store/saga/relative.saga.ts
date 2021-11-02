import * as Eff from 'redux-saga/effects';
import {call, put, select} from 'redux-saga/effects';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {
    actionAddRelative, actionDeleteRelative, actionUpdateRelative, actionUpdateStateRelative,
} from '../slice/relatives.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {IRelative, IRelativeIndex, IUser} from '../../interfaces/store';
import {splitDataAndId} from '../../helpers/utils';
import {errorSaga} from "./error.saga";
import {_sagaNewUserPic, requestSaga, uploadSaga} from "./network.saga";
import {ISaveRelativeCallback} from "../../screens/relativeFormScreen";
import {sagaUserUpdate} from "./user.saga";
import {userSelector} from "../selectors";
import {actionUserUpdate} from "../slice/user.slice";

const takeLatest: any = Eff.takeLatest;

function* watchRelative() {
    yield takeLatest('relatives/newRelative', sagaCreateRelative);
    yield takeLatest('relatives/updateRelative', sagaUpdateRelative);
    yield takeLatest('relatives/deleteRelative', sagaDeleteRelative);
}

function* sagaCreateRelative(action: PayloadAction<ISaveRelativeCallback>) {
    try {
        yield put(actionLoaderOn());
        const {relativeData, type, callBack, newImage} = action.payload
        const {data} = yield splitDataAndId(relativeData)
        const requestData = yield call(_sagaNewUserPic, {newImage, userData: data})
        const responseData: IRelative = yield call(requestSaga, {
            endPoint: 'relatives',
            method: 'POST',
            data: requestData
        })
        if (responseData) {
            yield put(
                actionAddRelative(responseData),
            );
            const user: IUser = yield select(userSelector)
            const relatives = [...user.relatives, {id: responseData._id, type}]
            yield put(actionUserUpdate({
                userData: {...user, relatives},
                callBack
            }))
        }
        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaUpdateRelative(action: PayloadAction<ISaveRelativeCallback>) {
    try {
        yield put(actionLoaderOn());
        const {relativeData, callBack, newImage, type} = action.payload
        const {id, data} = yield splitDataAndId(relativeData)
        const requestData = yield call(_sagaNewUserPic, {newImage, userData: data})
        const responseData: IRelative = yield call(requestSaga, {
            endPoint: 'relatives',
            method: 'PATCH',
            data: {id, userData: requestData}
        })
        if (responseData) {
            yield put(actionUpdateStateRelative({...requestData, _id: id}));
            if (callBack) callBack()
        }

        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaDeleteRelative(action: PayloadAction<IRelative>) {
    try {
        yield put(actionLoaderOn());
        const user: IUser = yield select(userSelector)
        const {id, data} = yield splitDataAndId(action.payload)

        const result = yield call(requestSaga, {
            endPoint: 'relatives',
            method: 'DELETE',
            data: {id, userData: data}
        })

        if (result) {
            // удалим родственника у юзера
            const relatives = user.relatives.filter(item => item.id !== id)
            yield put(actionUserUpdate({
                userData: {...user, relatives}
            }))

            // Удалим родственника из стор
            yield put(
                actionDeleteRelative({id}),
            );
        }

        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}


export {watchRelative};
