import {put} from "redux-saga/effects";
import {actionLoaderOff} from "../slice/loader.slice";
import {setModal} from "../slice/modal.slice";

function* errorSaga(error: Error) {
    yield put(actionLoaderOff());
    let message = undefined
    if (error.message === 'Network request failed') message = 'Нет связи с сервером. \nПроверьте соединение с интернетом. '
    yield put(setModal({
        title: 'Ошибка!' || error.name,
        bodyText: message || error.message,
        buttons: [{
            title: 'Закрыть',
            type: 'invert'
        }]
    }))
    console.log('err', error)
}

export {errorSaga};
