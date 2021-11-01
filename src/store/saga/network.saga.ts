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
import {FetchResult} from "react-native";


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


interface IResponseHandlerSaga {
    endPoint: string
    method: 'POST' | 'GET' | 'DELETE' | 'PATCH' | 'PUT'
    data?: any
}

function* requestSaga({method, endPoint, data}: IResponseHandlerSaga) {
    try {
        const accessToken = yield select(tokenSelector)
        const user: IUser = yield select(userSelector)
        const params = method === 'GET' ? {
            method
        } : {
            method,
            headers: {
                'Content-Type': 'application/json',
                'DeviceId': DeviceInfo.getUniqueId(),
                'Authorization': `Bearer ${accessToken}`,
                'UserId': user._id
            },
            body: JSON.stringify(data)
        }
        const response = yield fetch(
            `${env.endPointUrl}/${endPoint}`,
            params
        )
        const responseData = yield call(_sagaResponseHeader, response)
        return responseData

    } catch (error) {
        yield call(errorSaga, error)
    }
}

function* _sagaResponseHeader(response: Response) {
    try {
        const responseData = yield response.json();
        if (!response.ok) {
            if (response.status === 401) yield call(sagaLogOut)
            throw {name: 'Ошибка сервера', message: responseData.message}
        }

        // @ts-ignore
        const {authorization} = response.headers.map
        if (authorization) {
            const bearer = authorization.split(' ')[1]
            if (bearer) yield put(setToken(bearer))
        }

        return responseData
    } catch (error) {
        yield call(errorSaga, error)
    }
}

export interface IUploadSaga {
    files: {
        uri?: string
        type?: string
        name?: string
    }[],
    filesToDelete?: string[]
}

function* uploadSaga({files, filesToDelete = []}: IUploadSaga) {
    try {
        const accessToken = yield select(tokenSelector)
        const user: IUser = yield select(userSelector)
        const formdata = new FormData();
        files.map(item => formdata.append("file", item))
        filesToDelete.map(item => formdata.append('filesToDelete[]', item))
        const response = yield fetch(
            `${env.endPointUrl}/storage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'DeviceId': DeviceInfo.getUniqueId(),
                    'Authorization': `Bearer ${accessToken}`,
                    'UserId': user._id
                },
                body: formdata,
            })

        const responseData = yield call(_sagaResponseHeader, response)
        return responseData
    } catch (error) {
        yield call(errorSaga, error)
    }
}

export {requestSaga, watchNetwork, uploadSaga};
