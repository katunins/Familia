import {IRootItem, ITreeItem} from "../screens/tree/tree";
import {IRelative, IUser} from "../interfaces/store";


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

export const itemFromUser: (user: IUser | IRelative) => ITreeItem = user => {
    const {_id, name, parents, userPic} = user
    return {_id, name, parents, userPic}
}

export const getMaxWidth = (data: IRootItem[]) => {
    let max = 0
    data.map(item => {
        if (item.brothers.length > max) max = item.brothers.length
    })
    return max
}
