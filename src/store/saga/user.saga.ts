import * as Eff from 'redux-saga/effects';
import {put} from 'redux-saga/effects';
import FirebaseServices from '../../api/firebase';
import {IUser} from '../../interfaces/store';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {actionSetUser} from '../slice/user.slice';
import {needToUpload} from '../../helpers/utils';

const takeLatest: any = Eff.takeLatest;

function* watchUser() {
  yield takeLatest('user/userChange', sagaUserChange);
}

/**
 * Сага отслеживает изменение параметра пользователя и сохраняет изменения в Firebase
 * @param action
 */
function* sagaUserChange(action: PayloadAction<{userData: IUser}>) {
  try {
    yield put(actionLoaderOn());
    const {userData} = action.payload;

    const uploadUrl = yield needToUpload({
      userPic: userData.userPic,
      id: userData.id,
    });
    if (uploadUrl) userData.userPic = uploadUrl;
    yield FirebaseServices.updateUser(userData);
    yield put(actionSetUser(userData));

    yield put(actionLoaderOff());
  } catch (error) {
    console.log('err', error);
    yield put(actionLoaderOff());
  }
}

// /**
//  * Создание нового пользователя
//  */
// function* sagaNewUser(action: IActionNewUser){
//   const navigation =  action.payload
//   navigation.navigate('hello')
// }

export {watchUser};
