import {IRelative, IUser} from "../interfaces/store";
import {ITreeItem} from "../screens/tree/item";


/**
 * возвращает детей
 * @param parent
 */
export const getChildren: (data: { parent: ITreeItem, unionArr: ITreeItem[] }) => ITreeItem[] =
    ({
         parent,
         unionArr
     }) => {
        return unionArr.filter(item => item.parents.father === parent._id || item.parents.mother === parent._id)
    }

/**
 * возвращает массив родителей
 * @param child
 */
export const getParents: (data: { child: ITreeItem, unionArr: ITreeItem[] }) => ITreeItem[] = ({child, unionArr}) => {
    return unionArr.filter(item => item._id === child.parents.father || item._id === child.parents.mother)
}

/**
 * возвращает массив родных братьев и сестер
 * @param user
 */
export const getBrothers: (data: { user: ITreeItem, unionArr: ITreeItem[] }) => ITreeItem[] = ({user, unionArr}) => {
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
 * возвращает массив супругов, по принципу совместных детей
 * @param user
 */
export const getSpouse: (data: { user: ITreeItem, unionArr: ITreeItem[] }) => ITreeItem[] = ({user, unionArr}) => {
    const spouseArr: ITreeItem[] = []
    const children = getChildren({parent: user, unionArr})
    children.map(item => {
        let findSpouse: ITreeItem | undefined
        if (item.parents.mother === user._id) findSpouse = unionArr.find(el => el._id === item.parents.father)
        if (item.parents.father === user._id) findSpouse = unionArr.find(el => el._id === item.parents.mother)
        if (findSpouse && !spouseArr.find(item => item._id === findSpouse?._id)) spouseArr.push(findSpouse)
    })
    return spouseArr
}

/**
 * Делит массив братьев на части
 */
export interface ISplitBrothers { left: (ITreeItem|null)[], right: (ITreeItem|null)[] }
export const splitBrothers: (brothers: (ITreeItem|null)[]) => ISplitBrothers = (brothers) => {
    const result:ISplitBrothers = {left: [], right: []}
    if (brothers.length === 0) return result
    if (brothers.length === 1) return {left: brothers, right: [null]}
    const m = Math.ceil(brothers.length / 2);
    result.left = brothers.slice(0, m)
    result.right = brothers.slice(m, brothers.length)
    if (result.left.length > result.right.length) result.right.push(null)
    return result;
}
interface IItemBadge {
    item: ITreeItem | null
    unionArr: ITreeItem[]
}
export const itemBadge:(data:IItemBadge)=>string | undefined = ({item, unionArr}) => {
    if (!item) return undefined
    const children = getChildren({parent: item, unionArr})
    return children.length > 0 ? children.length.toString() : undefined
}

export const itemFromUser: (user: IUser | IRelative) => ITreeItem = user => {
    const {_id, name, parents, userPic} = user
    return {_id, name, parents, userPic}
}
