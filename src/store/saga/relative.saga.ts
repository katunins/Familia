import * as Eff from 'redux-saga/effects';
import {call, put, select} from 'redux-saga/effects';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {
    actionAddRelative, actionDeleteRelative, actionLoadRelatives,
    actionUpdateRelative,
    addRelative,
    deleteRelative,
    setRelatives,
    updateAndConvertTempRelative,
    updateRelative,
} from '../slice/relatives.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {IRelative, IServerRelative, IUser} from '../../interfaces/store';
import {idGenerator, splitDataAndId} from '../../helpers/utils';
import {errorSaga} from "./error.saga";
import {_sagaNewUserPic, requestSaga} from "./network.saga";
import {IAddRelativeCallback, ISaveRelativeCallback} from "../../screens/relatives/relativeFormScreen";
import {userSelector} from "../selectors";
import {actionUserUpdate} from "../slice/user.slice";
import {Image} from "react-native-image-crop-picker";

const takeLatest: any = Eff.takeLatest;

function* watchRelative() {
    yield takeLatest(actionAddRelative.type, sagaAddRelative);
    yield takeLatest(actionUpdateRelative.type, sagaUpdateRelative);
    yield takeLatest(actionDeleteRelative.type, sagaDeleteRelative);
    yield takeLatest(actionLoadRelatives.type, sagaLoadRelatives);
}

function* sagaLoadRelatives() {
    try {
        const user: IUser = yield select(userSelector)
        const relativesArr: IRelative[] = yield call(requestSaga, {
            endPoint: `relatives?userId=${user._id}`, method: 'GET'
        })
        yield put(setRelatives(relativesArr))
    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaAddRelative(action: PayloadAction<IAddRelativeCallback>) {
    try {

        yield put(actionLoaderOn());
        const {relativeData, callBack, newImage} = action.payload
        const tempId = idGenerator()
        yield put(addRelative({...relativeData, _id: tempId, userPic: newImage ? newImage.path : relativeData.userPic}))
        // const {data} = yield splitDataAndId(relativeData)
        let newRelativeData = Object.assign({}, relativeData)
        newRelativeData.userPic = yield call(_sagaNewUserPic, {newImage, userPic: relativeData.userPic})
        const responseData: IRelative = yield call(requestSaga, {
            endPoint: 'relatives',
            method: 'POST',
            data: newRelativeData
        })
        if (!responseData) return
        yield put(updateAndConvertTempRelative({newRelative: responseData, tempId}));
        callBack && callBack()
        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaUpdateRelative(action: PayloadAction<ISaveRelativeCallback>) {
    try {
        yield put(actionLoaderOn());
        const {relativeData, callBack, newImage} = action.payload
        yield put(updateRelative({...relativeData, userPic: newImage ? newImage.path : relativeData.userPic}))
        const {id, data}: { id: string, data: IServerRelative } = yield splitDataAndId(relativeData)
        let newRelativeData = Object.assign({}, data)
        newRelativeData.userPic = yield call(_sagaNewUserPic, {newImage, userPic: relativeData.userPic})
        const responseData: IRelative = yield call(requestSaga, {
            endPoint: 'relatives',
            method: 'PATCH',
            data: {id, userData: newRelativeData}
        })
        if (!responseData) return
        const resultRelative = Object.assign(newRelativeData, {_id:id})
        yield put(updateRelative(resultRelative))
        callBack && callBack()
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
        // Удалим родственника из стор
        yield put(deleteRelative({id}));
        const responseData = yield call(requestSaga, {
            endPoint: 'relatives',
            method: 'DELETE',
            data: {id, userData: data}
        })
        if (!responseData) return
        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}


export {watchRelative, sagaLoadRelatives};
