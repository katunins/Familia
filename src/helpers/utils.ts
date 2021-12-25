import {rem} from '../styles/remStyles';
import {
    INote,
    IRelative, IServerNote, IServerRelative, ITreeRelative,
    IUser,
} from '../interfaces/store';
import {Dimensions} from "react-native";
import env from "../config";
import {IServerImage} from "../store/saga/network.saga";
import moment from 'moment'
import 'moment/locale/ru'

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
export const splitDataAndId = (data: IRelative | INote): { id: string, data: IServerRelative | IServerNote } => {
    const cloneData = Object.assign({}, data)
    const id = data._id
    // @ts-ignore
    delete cloneData._id
    return {id, data: cloneData}
}

export const splitDataIdAndTimeStamps = (data: INote) => {
    const cloneData = Object.assign({}, data)
    const id = data._id
    const {createdAt, updatedAt} = data
    // @ts-ignore
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

export const uriParse = (uri: string): { uri: string } => {
    if (uri === '' || !uri) return {uri: ''}
    if (uri.indexOf('uploads/') > -1) return {uri: `${env.endPointUrl}/${uri}`}
    return {uri}
}

export const isServerUri = (uri: string) => {
    return uri.indexOf('uploads/') > -1
}

export const stringDateParse = (stringDate: string) => {
    if (stringDate === '') return stringDate
    moment.locale('ru')
    return stringDate.length === 4 ? `${stringDate} г.` : moment(stringDate).format('DD MMMM YYYY')
}

export const isRelativeChecked =
    ({
         id,
         relatives
     }: { id: string, relatives: string[] }) => !!relatives.find(item => item === id)

export const getTreePosition = (index: number, arrLength: number) => {
    if (arrLength === 1) return 'center'
    if (index === 0) return 'left'
    if (index === arrLength - 1) return 'right'
    return 'center'
}

export const marginHorizontal = 12
export const containerWidth = Dimensions.get('window').width - marginHorizontal * 2
export const squareAvatarSize = (Dimensions.get('window').width - marginHorizontal * 2) / 2 - 8
