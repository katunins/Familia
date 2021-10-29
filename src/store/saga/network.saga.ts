import {call, put, select} from "redux-saga/effects";
import DeviceInfo from "react-native-device-info";
import {errorSaga} from "./error.saga";
import {tokenSelector, userSelector} from "../selectors";
import {ILoginData, ISignUpData} from "../../interfaces";
import env from "../../config";
import {IServerRelative, IServerUser, IUser} from "../../interfaces/store";
import {setToken} from "../slice/token.slice";
import {sagaLogOut} from "./auth.saga";
import * as Eff from "redux-saga/effects";
import {Image} from "react-native-image-crop-picker";


interface IServerUserData {
    id: string,
    userData: IServerUser | IServerRelative
}

interface IRequestSaga {
    endPoint: string
    data: ISignUpData | ILoginData | IServerUserData | IServerRelative | string[]
}

const takeLatest: any = Eff.takeLatest;

function* watchNetwork() {
    yield takeLatest('network/upload', uploadSaga);
}

function* requestSaga({endPoint, data}: IRequestSaga) {
    try {
        const accessToken = yield select(tokenSelector)
        const user: IUser = yield select(userSelector)
        const response = yield fetch(
            `${env.endPointUrl}/${endPoint}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'DeviceId': DeviceInfo.getUniqueId(),
                    'Authorization': `Bearer ${accessToken}`,
                    'UserId': user._id
                },
                body: JSON.stringify(data)
            })

        const result = yield call(_responseHandlerSaga, response)
        return result
    } catch (error) {
        yield call(errorSaga, error)
    }

}

function* _responseHandlerSaga(response: Response) {
    const responseData = yield response.json();
    if (!response.ok) {
        if (response.status === 401) yield call(sagaLogOut)
        throw {name: 'Ошибка сервера', message: responseData.message}
    }

    const {authorization} = response.headers.map
    if (authorization) {
        const bearer = authorization.split(' ')[1]
        if (bearer) yield put(setToken(bearer))
    }

    return responseData
}

export interface IUploadSaga {
    path: string
    file: {
        uri?: string
        type?: string
        name?: string
    }
}

function* uploadSaga({path, file}: IUploadSaga) {
    try {
        const accessToken = yield select(tokenSelector)
        const user: IUser = yield select(userSelector)

        const formdata = new FormData();
        formdata.append("file", file)
        formdata.append("path", path)
        console.log(formdata)
        const response = yield fetch(
            `${env.endPointUrl}/storage/uploads/user`,
            {
                method: 'POST',
                headers: {
                    'DeviceId': DeviceInfo.getUniqueId(),
                    'Authorization': `Bearer ${accessToken}`,
                    'UserId': user._id
                },
                body: formdata
            })
        const result = yield call(_responseHandlerSaga, response)
        return result
    } catch (error) {
        yield call(errorSaga, error)
    }
}

export {requestSaga, watchNetwork, uploadSaga};
