import {call, put, select} from "redux-saga/effects";
import DeviceInfo from "react-native-device-info";
import {errorSaga} from "./error.saga";
import {tokenSelector, userSelector} from "../selectors";
import env from "../../config";
import IStore, {IUser} from "../../interfaces/store";
import {setToken} from "../slice/token.slice";
import {sagaLogOut} from "./auth.saga";
import * as Eff from "redux-saga/effects";
import {Image} from "react-native-image-crop-picker";
import {checkFilename} from "../../helpers/utils";
import {RootState} from "@reduxjs/toolkit/dist/query/core/apiState";

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
        const accessToken: string = yield select(tokenSelector)
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
        const response: any = yield fetch(
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
        const responseData: any = yield response.json();
        if (!response.ok) {
            if (response.status === 401) yield call(sagaLogOut)
            // throw {name: 'Ошибка сервера', message: responseData.message}
        }

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
    userPic: string
    newImage?: Image
}

function* _sagaNewUserPic({userPic, newImage}: ISagaNewUserPic): string {
    if (!newImage) return userPic
    const files = [{
        uri: newImage.path,
        type: newImage.mime,
        name: newImage.filename,
    }]
    const filesToDelete = userPic === '' ? [] : [userPic]
    const uploadResponse = yield call(uploadSaga, {files, filesToDelete})
    return uploadResponse[0].thumbnail
}

interface ISagaNewPostImages {
    newImages?: Image[]
    deleteImages?: string[]
}

function* _sagaUpdateNotesImages({newImages = [], deleteImages = []}: ISagaNewPostImages) {
    try {
        if ((newImages.length + deleteImages.length) === 0) return []
        const files = newImages.map(newImage => {
            return {
                uri: newImage.path,
                type: newImage.mime,
                name: newImage.filename,
            }
        })
        const uploadResponse: IUploadResponseSaga = yield call(uploadSaga, {files, filesToDelete: deleteImages})
        return uploadResponse.map(item => item.thumbnail)
    } catch (error) {
        yield call(errorSaga, error)
    }
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

export interface IUploadResponseSaga extends Array<{
    thumbnail: string,
    hd: string
}> {
}

function* uploadSaga({files, filesToDelete = []}: IUploadSaga) {
    try {
        const accessToken: string = yield select(tokenSelector)
        const user: IUser = yield select(userSelector)
        const formData = new FormData();
        files.map(item => {
            formData.append("file", checkFilename(item))
        })
        filesToDelete.map(item => formData.append('filesToDelete[]', item))
        const response: IUploadResponseSaga = yield fetch(
            `${env.endPointUrl}/storage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'DeviceId': DeviceInfo.getUniqueId(),
                    'Authorization': `Bearer ${accessToken}`,
                    'UserId': user._id
                },
                body: formData,
            })
        const responseData = yield call(_sagaResponseHeader, response)
        return responseData
    } catch (error) {
        yield call(errorSaga, error)
    }
}

export {requestSaga, watchNetwork, uploadSaga, _sagaNewUserPic, _sagaUpdateNotesImages};
