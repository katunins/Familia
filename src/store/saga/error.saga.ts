import {put} from "redux-saga/effects";
import {actionLoaderOff} from "../slice/loader.slice";
import {setModal} from "../slice/modal.slice";

function* errorSaga(error: Error) {
    yield put(actionLoaderOff());
    yield put(setModal({
        title: error.name || 'Ошибка!',
        bodyText: error.message,
        buttons: [{
            title: 'Закрыть',
        }]
    }))
    console.log('err', error);
}

export {errorSaga};
