import {ITreeRelative} from "../../interfaces/store";
import {initialUser} from "../../config";

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
export const getUserById = (id:string, unionArr: ITreeRelative[]) => {
    return  unionArr.find(user=>user._id === id) || {...initialUser, _id:''}
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
export const getSpouse: (user: ITreeRelative, unionArr: ITreeRelative[]) => ITreeRelative[] = (user, unionArr) => {
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
export const getChildren: (parent: ITreeRelative, unionArr: ITreeRelative[]) => ITreeRelative[] = (parent, unionArr) => {
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
export const getBrothers: (user: ITreeRelative, unionArr: ITreeRelative[]) => ITreeRelative[] = (user, unionArr) => {
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

