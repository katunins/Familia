import {IRelative, IUser} from "../interfaces/store";
import {ITree, ITreeItem, ITreeRoot} from "../screens/tree/tree";
import login from "../navigation/login";
import {treeItemSize} from "../config";

interface IProps {
    relatives: IRelative[]
    user: IUser
    item: IUser | IRelative
}

/**
 * выделяет необходимые данные для древа из пользователя
 * @param user
 */
const itemFromUser: (user: IUser | IRelative) => ITreeItem = (user) => {
    const {_id, name, userPic, parents} = user
    return {_id, name, userPic, parents}
}

/**
 * Расчитывает ширину боковых элементов древа
 * @param roots
 */
export const maxHorizontalTreeItems: (roots: ITreeRoot[]) => number|undefined = (roots) => {
    if (roots.length === 1) return undefined
    let maxItems = 0
    roots.map(item => maxItems = item.brothers.length > maxItems ? item.brothers.length : maxItems)
    return (maxItems + 1) * (treeItemSize.containerWidth + treeItemSize.marginHorizontal * 2) + treeItemSize.horizontalLine
}

/**
 * Строит объект семейного древа
 * @param relatives
 * @param user
 * @param item - пользователь от которого строится древо
 */
export const treeBuilder: (data: IProps) => ITree = ({relatives, user, item}) => {

    const rootItem = itemFromUser(item)

    /**
     * возвращает детей
     * @param parent
     */
    const getChildren: (parent: ITreeItem) => ITreeItem[] = (parent) => {
        return unionArr.filter(item => item.parents.father === rootItem._id || item.parents.mother === rootItem._id)
    }

    /**
     * возвращает массив родителей
     * @param child
     */
    const getParents: (child: ITreeItem) => ITreeItem[] = (child) => {
        return unionArr.filter(item => item._id === child.parents.father || item._id === child.parents.mother)
    }

    /**
     * возвращает массив родных братьев и сестер
     * @param user
     */
    const getBrothers: (user: ITreeItem) => ITreeItem[] = (user) => {
        const result: ITreeItem[] = []
        const parents = getParents(user)
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
    const getSpouse: (user: ITreeItem) => ITreeItem[] = (user) => {
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

    // создадим объединенный массив пользователя и родственников только из из нужных элементов
    const unionArr: ITreeItem[] = relatives.map(item => itemFromUser(item))
    unionArr.push(itemFromUser(user))

    const tree: ITree = {
        roots: [
            {
                item: rootItem,
                parents: [],
                brothers: []
            }
        ],
        children: []
    }


    // найдем детей
    tree.children = getChildren(rootItem)

    // найдем родителей
    const parents = getParents(rootItem)

    // найдем родителей, бабушек и дедушек
    tree.roots[0].parents = parents.map(parent => {
        return {
            parent,
            grandParents: getParents(parent)
        }
    })

    // найдем братьев и сестер
    tree.roots[0].brothers = getBrothers(rootItem)

    // найдем супруга
    const spouseArr = getSpouse(rootItem)
    if (spouseArr.length > 0) {
        // TODO возьмем первого в списке
        const spouse = spouseArr[0]
        tree.roots.push({
            item: spouse,
            parents: [],
            brothers: []
        })

        // найдем родителей супруга
        const parents = getParents(spouse)

        // найдем родителей, бабушек и дедушек супруга
        tree.roots[1].parents = parents.map(parent => {
            return {
                parent,
                grandParents: getParents(parent)
            }
        })

        // найдем братьев и сестер супруга
        tree.roots[1].brothers = getBrothers(spouse)

    }

    return tree
}
