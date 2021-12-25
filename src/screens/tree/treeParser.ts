import {ITreeRelative} from "../../interfaces/store";
import {grandParentTypeNames, initialUser} from "../../config";
import {useCallback} from "react";

interface IGetTreeRelatives {
    spouse: ITreeRelative[],
    children: ITreeRelative[],
    brothers: ITreeRelative[]
}

/**
 * Возвращает пользователя по Id
 * @param id
 * @param unionArr
 */
export const getUserById = (id: string, unionArr: ITreeRelative[]): ITreeRelative | undefined => {
    return unionArr.find(user => user._id === id)// || {...initialUser, _id: ''}
}

/**
 * Возращает стартовый объект пользователей для построения древа
 * @param rootUser
 * @param unionArr
 */
export const getTreeRelatives = (rootUserId: string, unionArr: ITreeRelative[]): IGetTreeRelatives => {
    const rootUser = getUserById(rootUserId, unionArr)
    const result = {
        spouse: getSpouse(rootUser, unionArr),
        children: getChildren(rootUser, unionArr),
        brothers: getBrothers(rootUser, unionArr)
    }
    return result
}

/**
 * возвращает массив супругов, по принципу совместных детей
 * @param user
 */
export const getSpouse: (user: ITreeRelative|undefined, unionArr: ITreeRelative[]) => ITreeRelative[] = (user, unionArr) => {
    if (!user) return []
    const spouseArr: ITreeRelative[] = []
    const children = getChildren(user, unionArr)
    children.map(item => {
        let findSpouse: ITreeRelative | undefined
        if (item.parents.mother === user._id) findSpouse = unionArr.find(el => el._id === item.parents.father)
        if (item.parents.father === user._id) findSpouse = unionArr.find(el => el._id === item.parents.mother)
        if (findSpouse && !spouseArr.find(item => item._id === findSpouse?._id)) spouseArr.push(findSpouse)
    })
    return spouseArr
}

/**
 * возвращает детей
 * @param parent
 */
export const getChildren: (parent: ITreeRelative|undefined, unionArr: ITreeRelative[]) => ITreeRelative[] = (parent, unionArr) => {
    if (!parent) return []
    return unionArr.filter(item => item.parents.father === parent._id || item.parents.mother === parent._id)
}

/**
 * Возвращает массив родителей
 * @param item
 */
export const getParentsArr = (item: ITreeRelative, unionArr: ITreeRelative[]) => {
    const parentItemsArr: ITreeRelative[] = []
    Object.keys(item.parents).map((parentType) => {
        const parent = unionArr.find((el) => item.parents[parentType as 'father' | 'mother'] === el._id)
        if (parent) parentItemsArr.push(parent)
    })
    return parentItemsArr
}

/**
 * возвращает массив родных братьев и сестер
 * @param user
 */
export const getBrothers: (user: ITreeRelative|undefined, unionArr: ITreeRelative[]) => ITreeRelative[] = (user, unionArr) => {
    if (!user) return []
    const result: ITreeRelative[] = []
    const parents = getParents(user, unionArr)
    unionArr.map(item => {
        if (item._id === user._id) return
        const motherCheck = parents.find(parent => parent._id === item.parents.mother)
        const fatherCheck = parents.find(parent => parent._id === item.parents.father)
        if (motherCheck && fatherCheck) result.push(item)
    })
    return result
}

/**
 * Делит массив братьев на части
 */
export interface ISplitBrothers {
    left: (ITreeRelative | null)[],
    right: (ITreeRelative | null)[]
}

export const splitBrothers: (brothers: (ITreeRelative | null)[]) => ISplitBrothers = (brothers) => {
    const result: ISplitBrothers = {left: [], right: []}
    if (brothers.length === 0) return result
    if (brothers.length === 1) return {left: brothers, right: [null]}
    const m = Math.ceil(brothers.length / 2);
    result.left = brothers.slice(0, m)
    result.right = brothers.slice(m, brothers.length)
    if (result.left.length > result.right.length) result.right.push(null)
    return result;
}

/**
 * возвращает родителей
 * @param child
 */
const getParents: (child: ITreeRelative, unionArr: ITreeRelative[]) => ITreeRelative[] = (child, unionArr) => {
    return unionArr.filter(item => item._id === child.parents.father || item._id === child.parents.mother)
}

interface IItemBadge {
    item: ITreeRelative
    unionArr: ITreeRelative[]
    noChildren?: boolean
    noBrothers?: boolean
    countDecrease?: number
}

export const itemBadge: (data: IItemBadge) => string | undefined =
    ({
         item,
         noBrothers,
         noChildren,
         countDecrease = 0,
         unionArr
     }) => {
        const children = noChildren ? [] : getChildren(item, unionArr)
        const brothers = noBrothers ? [] : getBrothers(item, unionArr)
        const count = children.length + brothers.length - countDecrease
        return count > 0 ? `+${count}` : undefined
    }

type IGetType = {
    user: ITreeRelative
    item: ITreeRelative
    unionArr: ITreeRelative[]
}
/**
 * возвращает тип родственника
 * @param user - пользователь, относительно которого идет поиск
 * @param item - родственник, которому нужно найти тип
 * @param unionArr - массив для поиска
 */
export const getRelativeType: (data: IGetType) => string | undefined =
    ({
         user,
         item,
         unionArr
     }) => {

        const {mother, father} = user.parents

        if (mother === item._id) return 'Мать'
        if (father === item._id) return 'Отец'

        if (mother === item.parents.mother || father === item.parents.father) return 'Братья и сестры'

        if (item.parents.mother === user._id || item.parents.father === user._id) return 'Дети'

        const userSpouse = getSpouse(user, unionArr)
        if (userSpouse.length > 0) {
            if (userSpouse[0]._id === item._id) return 'Супруги'
            if (userSpouse[0].parents.father === item._id) return 'Тесть, свекр'
            if (userSpouse[0].parents.mother === item._id) return 'Теща, свекровь'
        }

        const grandParentType = _getRecursiveParents({user, item, unionArr})
        if (grandParentType) return grandParentType

        // Тети - дяди
        // Племянники
        return undefined
    }


interface IGetRecursive {
    user: ITreeRelative | undefined,
    item: ITreeRelative
    unionArr: ITreeRelative[]
    level?: number
}

/**
 * Рекурсионная функция получает пользователя
 * првоеяет родственную связь с item на бабушка, дед или пра
 * @param user - итерация - пользователь, в котором проверяем родителей
 * @param item - пользователь, по которому ищем совпадение
 * @param level - уровень в данный момент
 * @param unionArr - массив для поиска
 */
const _getRecursiveParents = ({user, item, level = 0, unionArr}: IGetRecursive): string | undefined => {
    if (!user) return undefined
    return Object.keys(user.parents).map(parentType => {
        const parentId = user.parents[parentType as 'mother' | 'father']
        if (parentId === item._id) {
            return _getGreatParentType(grandParentTypeNames[parentType as 'mother' | 'father'], level)
        } else {
            const nextUser = getUserById(parentId, unionArr)
            return _getRecursiveParents({user: nextUser, item, level: level + 1, unionArr})
        }
    }).find(item => item)
}

const _getGreatParentType = (type: string, level: number): string => {
    const result = Array(level - 1).fill('пра').join('') + type
    return result.replace(result[0], result[0].toUpperCase())
}
