import {rem} from '../styles/remStyles';
import {
    INote,
    IRelative, ITreeRelative,
    IUser,
} from '../interfaces/store';
import {Dimensions} from "react-native";
import env from "../config";
import {IServerImage} from "../store/saga/network.saga";
import moment from 'moment'
import 'moment/locale/ru'

type IGetType = {
    root: ITreeRelative
    item: ITreeRelative
    relatives: IRelative[]
}
export const getType: (data: IGetType) => string = ({root, item, relatives}) => {
    const _relativeById = (id: string) => relatives.find(item => item._id === id)
    const _getChildren = (id: string) => relatives.find(item => item.parents.mother === id || item.parents.father === id)
    const _isSpouse = (rootId: string, itemId: string) => {
        const itemChild = _getChildren(itemId)
        const rootChild = _getChildren(rootId)
        if (!itemChild || !rootChild) return false
        return itemChild.parents.mother === rootChild.parents.mother
    }
    const result = ''
    if (root.parents.mother === item._id) return 'Мама'
    if (root.parents.father === item._id) return 'Отец'
    if (root.parents.mother === item.parents.mother) return 'Братья и сестры'
    if (_relativeById(root.parents.mother)?.parents.mother === item._id) return 'Тетя'
    if (_relativeById(root.parents.mother)?.parents.father === item._id) return 'Дядя'
    if (item.parents.mother === root._id || item.parents.father === root._id) return 'Дети'
    if (_isSpouse(root._id, item._id)) return 'Супруг'
    if (_relativeById(root.parents.mother)?.parents.mother === item._id) return 'Бабушка по Маме'
    if (_relativeById(root.parents.mother)?.parents.father === item._id) return 'Дед по Маме'
    if (_relativeById(root.parents.father)?.parents.mother === item._id) return 'Бабушка по Отцу'
    if (_relativeById(root.parents.father)?.parents.father === item._id) return 'Дед по Отцу'
    return result
}

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
export const splitDataAndId = (data: ITreeRelative | INote) => {
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
