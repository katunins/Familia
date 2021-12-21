import {ITreeItem} from "./item";
import {IRelative, IUser} from "../../interfaces/store";

// корневой массив всех родственников
let unionArr: ITreeItem[] = []

/**
 * Загрузает в unionArr всех родственников
 * @param user
 * @param relatives
 */
export const loadUnionArr = ({user, relatives}: { user: IUser, relatives: IRelative[] }) => {
    unionArr = []
    relatives.map(item => unionArr.push(itemFromUser(item)))
    unionArr.push(itemFromUser(user))
}

/**
 * возвращает массив супругов, по принципу совместных детей
 * @param user
 */
export const getSpouse: (user: ITreeItem) => ITreeItem[] = (user) => {
    const spouseArr: ITreeItem[] = []
    const children = getChildren(user)
    children.map(item => {
        let findSpouse: ITreeItem | undefined
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
export const getChildren: (parent: ITreeItem) => ITreeItem[] = (parent) => {
    return unionArr.filter(item => item.parents.father === parent._id || item.parents.mother === parent._id)
}

/**
 * Возвращает массив родителей
 * @param item
 */
export const getParentsArr = (item: ITreeItem) => {
    const parentItemsArr: ITreeItem[] = []
    Object.keys(item.parents).map((parentType, index) => {
        const parent = unionArr.find((el) => item.parents[parentType as 'father' | 'mother'] === el._id)
        if (parent) parentItemsArr.push(parent)
    })
    return parentItemsArr
}

/**
 * возвращает массив родных братьев и сестер
 * @param user
 */
export const getBrothers: (user: ITreeItem) => ITreeItem[] = (user) => {
    const result: ITreeItem[] = []
    const parents = getParents({child: user, unionArr})
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
    left: (ITreeItem | null)[],
    right: (ITreeItem | null)[]
}

export const splitBrothers: (brothers: (ITreeItem | null)[]) => ISplitBrothers = (brothers) => {
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
 * возвращает массив родителей
 * @param child
 */
const getParents: (data: { child: ITreeItem, unionArr: ITreeItem[] }) => ITreeItem[] = ({child, unionArr}) => {
    return unionArr.filter(item => item._id === child.parents.father || item._id === child.parents.mother)
}

interface IItemBadge {
    item: ITreeItem
    noChildren?: boolean
    noBrothers?:boolean
    countDecrease?:number
}

export const itemBadge: (data: IItemBadge) => string | undefined = ({item, noBrothers, noChildren, countDecrease=0}) => {
    const children = noChildren ? [] : getChildren(item)
    const brothers = noBrothers ? [] : getBrothers(item)
    const count = children.length + brothers.length - countDecrease
    return count > 0 ? `+${count}` : undefined
}

export const itemFromUser: (user: IUser | IRelative) => ITreeItem = user => {
    const {_id, name, parents, userPic} = user
    return {_id, name, parents, userPic}
}

