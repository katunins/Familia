import * as Eff from 'redux-saga/effects';
import {put, select} from 'redux-saga/effects';
import FirebaseServices from '../../api/firebase';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {
    actionAddRelative,
    actionDeleteRelative, actionUpdateStateRelative,
    IActionNewRelative,
} from '../slice/relatives.slice';
import {actionUserChange} from '../slice/user.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import userSelector from '../selectors';
import {IUser} from '../../interfaces/store';
import {needToUpload} from '../../helpers/utils';

const takeLatest: any = Eff.takeLatest;

function* watchRelative() {
    yield takeLatest('relatives/newRelative', sagaNewRelative);
    yield takeLatest('relatives/updateRelative', sagaRelativeChange);
    yield takeLatest('relatives/deleteRelative', sagaEraseRelative);
}

function* sagaRelativeChange(action: PayloadAction<IActionNewRelative>) {
    try {
        yield put(actionLoaderOn());
        const relativeData = action.payload.userData;
        const newRelativeType = action.payload.creatorData.type
        // const creatorData = action.payload.creatorData;
        const userStoreData: IUser = yield select(userSelector);

        const uploadUrl = yield needToUpload({
            userPic: relativeData.userPic,
            id: relativeData.id,
        });
        if (uploadUrl) relativeData.userPic = uploadUrl;

        // Обновим тип родственника
        const relativeType = userStoreData.relatives.filter(item => item.id === relativeData.id)[0].type
        if (relativeType !== newRelativeType) {
            let newUserData: IUser = JSON.parse(JSON.stringify(userStoreData));
            newUserData.relatives = newUserData.relatives.map(item => item.id === relativeData.id && item.type !== newRelativeType ? {
                ...item,
                type: newRelativeType
            } : item)
            yield put(actionUserChange({userData: newUserData}));
        }
        // сохраним фотогарфию
        // if (relativeData.userPic && relativeData.userPic.indexOf('file:///') > -1) {
        //   const res = yield FirebaseServices.putImage({
        //     pathToFile: relativeData.userPic,
        //     remoteFolder: `${relativeData.id}/userPic`,
        //   });
        //   const url = yield storage().ref(res.metadata.fullPath).getDownloadURL();
        //   relativeData.userPic = url;
        // }


        yield put(actionUpdateStateRelative(relativeData));
        yield FirebaseServices.updateRelative(relativeData)

        yield put(actionLoaderOff());
    } catch (e) {
        console.log(e);
    }
}

/**
 * Сага устанавливает пользователя
 * @param userData - объект данных пользователя
 */
function* sagaNewRelative(action: PayloadAction<IActionNewRelative>) {
    try {
        yield put(actionLoaderOn());
        const relativeData = action.payload.userData;
        const creatorData = action.payload.creatorData;
        const userStoreData = yield select(userSelector);

        const uploadUrl = yield needToUpload({
            userPic: relativeData.userPic,
            id: relativeData.id,
        });
        if (uploadUrl) relativeData.userPic = uploadUrl;

        // сохраним фотогарфию
        // if (relativeData.userPic && relativeData.userPic.indexOf('file:///') > -1) {
        //   const res = yield FirebaseServices.putImage({
        //     pathToFile: relativeData.userPic,
        //     remoteFolder: `${relativeData.id}/userPic`,
        //   });
        //   const url = yield storage().ref(res.metadata.fullPath).getDownloadURL();
        //   relativeData.userPic = url;
        // }

        const newRelativeUser = yield FirebaseServices.newRelative(relativeData);
        relativeData.id = newRelativeUser.id;
        yield FirebaseServices.updateRelative(relativeData); // добавим запись ID в firebase

        yield put(actionAddRelative(relativeData));
        let newUserData: IUser = JSON.parse(JSON.stringify(userStoreData));
// @ts-ignore
        newUserData.relatives.push({id: relativeData.id, type: creatorData.type});
        yield put(actionUserChange({userData: newUserData}));

        // if (action.payload.callBack) action.payload.callBack();
        // yield sagaSetUser(userData);

        yield put(actionLoaderOff());
    } catch (error) {
        console.log('err', error);
        yield put(actionLoaderOn());
    }
}

function* sagaEraseRelative(action: PayloadAction<string>) {
    try {
        yield put(actionLoaderOn());
        yield FirebaseServices.deleteRelative(action.payload);
        const user: IUser = yield select(userSelector);
        const newUserRelatives = user.relatives.filter(
            item => item.id !== action.payload,
        );
        console.log('newUserRelatives', action.payload, newUserRelatives, user.relatives)

        // @ts-ignore
        yield put(actionUserChange({...user, relatives: newUserRelatives}));

        yield put(actionDeleteRelative(action.payload));
        yield put(actionLoaderOff());
    } catch (e) {
        console.log(e);
        yield put(actionLoaderOff());
    }
}

export {watchRelative};
