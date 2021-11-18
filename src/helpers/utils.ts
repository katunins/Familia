import {rem} from '../styles/remStyles';
import {
    INote,
    IRelative,
    IUser,
} from '../interfaces/store';
import FirebaseServices from '../api/firebase';
import storage from '@react-native-firebase/storage';
import {Dimensions} from "react-native";
import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import env from "../config";
import {IServerImage} from "../store/saga/network.saga";
import moment from 'moment'
import 'moment/locale/ru'

/**
 * Обработка ссылки на загруженную фотографию
 * проверяет и если ссылка локальная, то выгружает на сервер и возвращает ссылку на сервер
 */

interface INeedToUpload {
    userPic: string;
    id: string;
}

export const needToUpload = async ({userPic, id}: INeedToUpload) => {
    try {
        if (userPic.indexOf('http') > -1) return false;
        const res = await FirebaseServices.putImage({
            pathToFile: userPic,
            remoteFolder: `${id}/userPic`,
        }) as FirebaseFirestoreTypes.DocumentData
        const url = await storage().ref(res.metadata.fullPath).getDownloadURL();
        return url;
    } catch (e) {
        console.log(e);
        return false;
    }
};

/**
 * Функция высчитывания динамического размера
 * получает пиксели - возвращает ремы
 * @param number - Размер
 */
export const remCalc: (number: number) => number = (number: number) =>
    (number / 12) * rem;

export interface IGetRelativeUri {
    selectRelatives: IRelative[]
    id: string
}

/**
 * Возвращает сслыку на аватарку родственника по id
 * @param selectRelatives
 * @param id
 */
export const getRelativeUri = ({selectRelatives, id}: IGetRelativeUri) => {
    const uri = selectRelatives.find(item => item?._id === id)?.userPic
    return uri ? `${env.endPointUrl}/${uri}` : undefined
}

export const splitDataAndId = (data: IUser | IRelative | INote) => {
    const cloneData = Object.assign({}, data)
    const id = data._id
    delete cloneData._id
    return {id, data: cloneData}
}

export const splitDataIdAndTimeStamps = (data: INote) => {
    const cloneData = Object.assign({}, data)
    const id = data._id
    const {createdAt, updatedAt} = data
    delete cloneData._id
    delete cloneData.createdAt
    delete cloneData.updatedAt
    return {id, createdAt, updatedAt, data: cloneData}
}

export const idGenerator = () => `tempID_${Math.random().toString(16).slice(2)}`

export const checkFilename = (item: IServerImage) => {
    const {name} = item
    if (name && name.indexOf('HEIC') > -1) item.name = name.replace(/\.[^.]+$/, '.JPG')
    return item
}

interface IGetRelativeType {
    user: IUser,
    relative: IRelative
}

export const getRelativeType = ({user, relative}: IGetRelativeType) => {
    const type = user.relatives.find(item => item.id === relative._id)?.type
    return type || 'other'
}

export const uriParse = (uri: string): { uri: string } => {
    if (uri === '' || !uri) return {uri: ''}
    if (uri.indexOf('uploads/') > -1) return {uri: `${env.endPointUrl}/${uri}`}
    return {uri}
}

export const isServerUri = (uri: string) => {
    return uri.indexOf('uploads/') > -1
}

export const stringDateParse = (stringDate: string) => {
    moment.locale('ru')
    return stringDate.length === 4 ? `${stringDate} г.` : moment(stringDate).format('DD MMMM YYYY')
}

export const isRelativeChecked = ({
                                      id,
                                      relatives
                                  }: { id: string, relatives: string[] }) => !!relatives.find(item => item === id)

export const marginHorizontal = 12
export const containerWidth = Dimensions.get('window').width - marginHorizontal * 2
export const squareAvatarSize = (Dimensions.get('window').width - marginHorizontal * 2) / 2 - 8
