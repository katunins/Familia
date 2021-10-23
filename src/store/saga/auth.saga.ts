import * as Eff from 'redux-saga/effects';
import {call, take, put, select, all} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {eventChannel} from 'redux-saga';
import FirebaseServices from '../../api/firebase';
import userSelector from '../selectors';
import {IRelativeIndex, IUser} from '../../interfaces/store';

import {
    actionSignIn,
    IActionSign,
} from '../slice/firebase.slice';
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
import {IUserAuthData} from '../../interfaces';

import {Alert} from "react-native";
import DeviceInfo from "react-native-device-info";
import {resetPosts, setPosts} from "../slice/posts.slice";
import {resetModal, setModal} from "../slice/modal.slice";
import {useDispatch} from "react-redux";

const takeLatest: any = Eff.takeLatest;

function* watchAuth() {
    yield takeLatest('firebase/actionSignUp', sagaSignUp);
    yield takeLatest('firebase/actionSignIn', sagaSignIn);
    yield takeLatest('firebase/deleteImages', sagaDeleteImages);
    yield takeLatest('firebase/actionLogOut', sagaLogOut);
}

/**
 * Функции, которые подписываются на изменения авторизации пользователя Firebase
 */

const authStateChannel = function () {
    return eventChannel(emit => {
        const unsubscribe = auth().onAuthStateChanged(user => emit({user}));
        return unsubscribe;
    });
};

const watchForFirebaseAuth = function* () {
    const channel = yield call(authStateChannel);
    while (true) {
        const {user} = yield take(channel);
        yield put(actionLoaderOff());

        if (user) {
            // Данные регистрации от firebase
            const userAuthData = user.toJSON();
            // Хранилище данных пользователя в store
            const userStoreData = yield select(userSelector);
            // Если хранилище в store пустое, то запишем
            if (Object.keys(userStoreData).length === 0) {
                const userData: IUser = yield FirebaseServices.getUserByUID(userAuthData.uid);
                // вдруг в хранилище есть дубликат
                if (!userData) {
                    yield put(actionResetUser());
                    return;
                }

                if (userData.authDevice.id !== "" && userData.authDevice.id !== DeviceInfo.getUniqueId()) {
                    const diffTime = (Number(new Date()) - userData.authDevice.lastRequest.toDate()) / 3600000
                    if (diffTime < 12) {
                        yield Alert.alert('Ошибка', 'Другое устройство в данный момент авторизовано под этими учетныи данными. Выйдете из аккаунта на другом устройстве или повторите попытку через час')
                        yield sagaLogOut()
                        yield put(actionLoaderOff());
                        return
                    }
                }

                yield put(
                    actionSetUser({
                        ...userData,
                        email: userAuthData.email,
                        uid: userAuthData.uid,
                    }),
                );

                // загрузим родственников
                if (userData.relatives.length > 0) {
                    const relativesArr = userData.relatives.map(
                        (item: IRelativeIndex) => item.id,
                    );
                    const relatives = yield FirebaseServices.getRelatives(relativesArr);
                    if (relatives) yield put(actionSetRelatives(relatives));
                }

                // загрузим посты
                const posts = yield FirebaseServices.getPosts(userData.id)
                if (posts.length > 0) yield put(setPosts(posts))

                yield FirebaseServices.setAuthDevice(true, {
                    ...userData,
                    email: userAuthData.email,
                    uid: userAuthData.uid,
                })
            }
        } else {
            // logOut - очистим стейт
            const userStoreData = yield select(userSelector);
            // if (Object.keys(userStoreData).length === 0) return
            if (Object.keys(userStoreData).length > 0) yield FirebaseServices.setAuthDevice(false, userStoreData)
            yield put(actionResetUser());
            yield put(actionResetRelatives());
            yield put(resetPosts())
        }
    }
};

function* sagaSignUp(action: PayloadAction<{ data: IUserAuthData }>) {
    try {
        yield put(actionLoaderOn());
        const {email, password} = action.payload.data;
        const signUpResult = yield auth().createUserWithEmailAndPassword(email, password);
        yield put(setModal({
            title: 'Поздравляем!',
            bodyText: 'Вы успешно зарегестрированы в системе!',
            buttons: [{
                title: 'Закрыть',
            }]
        }))

        let userData: IUser = {
            id: '',
            uid: signUpResult.user.uid,
            userPic: '',
            name: action.payload.data.name || '',
            birthday: '',
            relatives: [],
            about: '',
            authDevice: {id: '', lastRequest: ''},
            email: action.payload.data.email,
        };

        const newUser = yield FirebaseServices.newUser(userData);
        userData.id = newUser.id;

        yield FirebaseServices.updateUser(userData);

        yield put(
            actionSignIn({
                data: {email, password},
            }),
        );

        yield FirebaseServices.setAuthDevice(true, userData)

        yield put(actionLoaderOff());
    } catch (error) {
        console.log('err', error);
        yield put(actionLoaderOff());
        if (error.code === 'auth/email-already-in-use') {
            yield put(setModal({
                title: 'Внимание!',
                bodyText: 'Ошибка авторизации. Такой пользователь уже существует в системе',
                buttons: [{
                    title: 'Закрыть',
                }]
            }))
        }
        if (error.code === 'auth/invalid-email') {
            yield put(setModal({
                title: 'Внимание!',
                bodyText: 'Ошибка авторизации. Не верный email',
                buttons: [{
                    title: 'Закрыть',
                }]
            }))
        }
    }
}

function* sagaSignIn(action: IActionSign) {
    try {
        const {email, password} = action.payload.data;
        yield put(actionLoaderOn());
        yield auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.log('err', error.code);
        yield put(actionLoaderOff());
        if (error.code === 'auth/user-not-found') {
            yield put(setModal({
                title: 'Внимание!',
                bodyText: 'Проверьре корректность введеного email',
                buttons: [{
                    title: 'Закрыть',
                }]
            }))
        }
        if (error.code === 'auth/wrong-password') {
            yield put(setModal({
                title: 'Внимание!',
                bodyText: 'Проверьте корректность введеного пароль',
                buttons: [{
                    title: 'Закрыть'
                }]
            }))
        }
    }
}

function* sagaLogOut() {
    try {
        yield put(actionLoaderOn());
        yield auth().signOut();

    } catch (error) {
        console.log('err', error.code);
        yield put(actionLoaderOff());
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

export {watchAuth, watchForFirebaseAuth};
