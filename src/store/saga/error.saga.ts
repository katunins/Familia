import {put} from "redux-saga/effects";
import {actionLoaderOff} from "../slice/loader.slice";
import {setModal} from "../slice/modal.slice";

function* errorSaga(anyError: any) {
    yield put(actionLoaderOff());
    const error = (anyError instanceof Error) ? {
        name: anyError.name,
        message: anyError.message
    } : {
        name: "Error",
        message: anyError?.toString() || "An unknown error occurred"
    }
    // if (error.message === 'Network request failed') message = 'Нет связи с сервером. \nПроверьте соединение с интернетом. '
    yield put(setModal({
        title: error.name,
        bodyText: error.message,
        buttons: [{
            title: 'Закрыть',
            type: 'invert'
        }]
    }))
    console.log('err', error)
}

export {errorSaga};
