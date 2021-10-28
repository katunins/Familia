import * as Eff from 'redux-saga/effects';
import {call, put, select} from 'redux-saga/effects';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {
    actionAddRelative, actionUpdateRelative, actionUpdateStateRelative,
} from '../slice/relatives.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {IRelative, IRelativeIndex, IUser} from '../../interfaces/store';
import {splitUserId} from '../../helpers/utils';
import {errorSaga} from "./error.saga";
import {requestSaga} from "./network.saga";
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
        const {relativeData, type, callBack} = action.payload
        const {id, userData} = yield splitUserId(relativeData)

        const responseData: IRelative = yield call(requestSaga, {
            endPoint: 'relatives/create',
            data: userData
        })
        if (!responseData) return false
        yield put(
            actionAddRelative(responseData),
        );
        const user: IUser = yield select(userSelector)
        yield put(actionUserUpdate({
            userData: {...user, relatives: [...user.relatives, {id: responseData._id, type}]},
            callBack
        }))

        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaGetRelativesFromArray(relativesArr: IRelativeIndex[]) {
    try {
        if (relativesArr.length === 0) return []
        const data = relativesArr.map(item => item.id)
        const responseData: IRelative[] = yield call(requestSaga, {
            endPoint: 'relatives/get', data
        })
        return responseData
    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaUpdateRelative(action: PayloadAction<ISaveRelativeCallback>) {
    try {
        yield put(actionLoaderOn());
        const {relativeData, callBack} = action.payload
        const {id, userData} = yield splitUserId(relativeData)

        const responseData: IRelative = yield call(requestSaga, {
            endPoint: 'relatives/update',
            data: {id, userData}
        })
        if (!responseData) return false
        yield put(actionUpdateStateRelative(relativeData));
        callBack()
        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* sagaDeleteRelative(action: PayloadAction<{ data: IRelative }>) {
    try {
        yield put(actionLoaderOn());
        const {id, userData} = yield splitUserId(action.payload.data)

        const responseData: IRelative = yield call(requestSaga, {
            endPoint: 'relatives/delete',
            data: {id, userData}
        })

        // Добавим родственника в стор
        yield put(
            actionAddRelative(responseData),
        );

        yield put(actionLoaderOff());

    } catch (error) {
        yield call(errorSaga, error)
    }
}

// function* sagaRelativeChange(action: PayloadAction<IActionNewRelative>) {
//     try {
//         yield put(actionLoaderOn());
//         const relativeData = action.payload.userData;
//         const newRelativeType = action.payload.creatorData.type
//         // const creatorData = action.payload.creatorData;
//         const userStoreData: IUser = yield select(userSelector);
//
//         const uploadUrl = yield needToUpload({
//             userPic: relativeData.userPic,
//             id: relativeData.id,
//         });
//         if (uploadUrl) relativeData.userPic = uploadUrl;
//
//         // Обновим тип родственника
//         const relativeType = userStoreData.relatives.filter(item => item.id === relativeData.id)[0].type
//         if (relativeType !== newRelativeType) {
//             let newUserData: IUser = JSON.parse(JSON.stringify(userStoreData));
//             newUserData.relatives = newUserData.relatives.map(item => item.id === relativeData.id && item.type !== newRelativeType ? {
//                 ...item,
//                 type: newRelativeType
//             } : item)
//             yield put(actionUserUpdate({userData: newUserData}));
//         }
//         // сохраним фотогарфию
//         // if (relativeData.userPic && relativeData.userPic.indexOf('file:///') > -1) {
//         //   const res = yield FirebaseServices.putImage({
//         //     pathToFile: relativeData.userPic,
//         //     remoteFolder: `${relativeData.id}/userPic`,
//         //   });
//         //   const url = yield storage().ref(res.metadata.fullPath).getDownloadURL();
//         //   relativeData.userPic = url;
//         // }
//
//
//         yield put(actionUpdateStateRelative(relativeData));
//         yield FirebaseServices.updateRelative(relativeData)
//
//         yield put(actionLoaderOff());
//     } catch (e) {
//         console.log(e);
//     }
// }
//
// /**
//  * Сага устанавливает пользователя
//  * @param userData - объект данных пользователя
//  */
// function* sagaNewRelative(action: PayloadAction<IActionNewRelative>) {
//     try {
//         yield put(actionLoaderOn());
//         const relativeData = action.payload.userData;
//         const creatorData = action.payload.creatorData;
//         const userStoreData = yield select(userSelector);
//
//         const uploadUrl = yield needToUpload({
//             userPic: relativeData.userPic,
//             id: relativeData.id,
//         });
//         if (uploadUrl) relativeData.userPic = uploadUrl;
//
//         // сохраним фотогарфию
//         // if (relativeData.userPic && relativeData.userPic.indexOf('file:///') > -1) {
//         //   const res = yield FirebaseServices.putImage({
//         //     pathToFile: relativeData.userPic,
//         //     remoteFolder: `${relativeData.id}/userPic`,
//         //   });
//         //   const url = yield storage().ref(res.metadata.fullPath).getDownloadURL();
//         //   relativeData.userPic = url;
//         // }
//
//         const newRelativeUser = yield FirebaseServices.newRelative(relativeData);
//         relativeData.id = newRelativeUser.id;
//         yield FirebaseServices.updateRelative(relativeData); // добавим запись ID в firebase
//
//         yield put(actionAddRelative(relativeData));
//         let newUserData: IUser = JSON.parse(JSON.stringify(userStoreData));
// // @ts-ignore
//         newUserData.relatives.push({id: relativeData.id, type: creatorData.type});
//         yield put(actionUserUpdate({userData: newUserData}));
//
//         // if (action.payload.callBack) action.payload.callBack();
//         // yield sagaSetUser(userData);
//
//         yield put(actionLoaderOff());
//     } catch (error) {
//         console.log('err', error);
//         yield put(actionLoaderOn());
//     }
// }
//
// function* sagaEraseRelative(action: PayloadAction<string>) {
//     try {
//         yield put(actionLoaderOn());
//         yield FirebaseServices.deleteRelative(action.payload);
//         const user: IUser = yield select(userSelector);
//         const newUserRelatives = user.relatives.filter(
//             item => item.id !== action.payload,
//         );
//         console.log('newUserRelatives', action.payload, newUserRelatives, user.relatives)
//
//         // @ts-ignore
//         yield put(actionUserUpdate({...user, relatives: newUserRelatives}));
//
//         yield put(actionDeleteRelative(action.payload));
//         yield put(actionLoaderOff());
//     } catch (e) {
//         console.log(e);
//         yield put(actionLoaderOff());
//     }
// }

export {watchRelative, sagaGetRelativesFromArray};
