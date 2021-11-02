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
import {checkIfHEIC} from "../../helpers/utils";


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
        const headers = new Headers()
        headers.append('DeviceId', DeviceInfo.getUniqueId())
        headers.append('Authorization', `Bearer ${accessToken}`)
        headers.append('UserId', user?._id || '')
        headers.append('Content-Type', 'application/json')
        const params = {
            method,
            headers,
            body: method === 'GET' ? undefined : JSON.stringify(data)
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

interface ISagaNewUserPic {
    userData: IServerUser | IServerRelative
    newImage?: Image
}

function* _sagaNewUserPic({userData, newImage}: ISagaNewUserPic) {
    if (!newImage) return userData
    const files = [{
        uri: newImage.path,
        type: newImage.mime,
        name: newImage.filename,
    }]
    const filesToDelete = userData.userPic === '' ? [] : [userData.userPic]
    const uploadResponse = yield call(uploadSaga, {files, filesToDelete})
    return {...userData, userPic: uploadResponse[0].path}
}

interface ISagaNewPostImages {
    newImages?: Image[]
    deleteImages?: string[]
}

function* _sagaUpdateNotesImages({newImages = [], deleteImages = []}: ISagaNewPostImages) {
    if ((newImages.length + deleteImages.length) === 0) return []
    const files = newImages.map(newImage => {
        return {
            uri: newImage.path,
            type: newImage.mime,
            name: newImage.filename,
        }
    })
    const uploadResponse = yield call(uploadSaga, {files, filesToDelete: deleteImages})
    return uploadResponse
}

export interface IServerImage {
    uri?: string
    type?: string
    name?: string
}

export interface IUploadSaga {
    files: IServerImage[],
    filesToDelete?: string[]
}

function* uploadSaga({files, filesToDelete = []}: IUploadSaga) {
    try {
        const accessToken = yield select(tokenSelector)
        const user: IUser = yield select(userSelector)
        const formdata = new FormData();
        files.map(item => {
            formdata.append("file", checkIfHEIC(item))
        })
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

export {requestSaga, watchNetwork, uploadSaga, _sagaNewUserPic, _sagaUpdateNotesImages};
