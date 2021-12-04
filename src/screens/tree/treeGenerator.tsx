import React, {useState} from "react";
import {LayoutChangeEvent, Text, View} from "react-native";
import styles from "./styles";
import ItemTreeComponent, {ITreeItem} from "./item";
import {treeItemSize} from "../../config";
import VerticalLineComponent from "./verticalLine";
import HorizontalUnionLineComponent from "./horizontalLine";
import BrothersWrapperComponent from "./brothersWrapper";
import {getBrothers} from "../../helpers/tree";


export interface ITreePosition {
    alignItems: 'flex-start' | 'center' | 'flex-end'
}

interface IProps extends ITreePosition {
    rootUser: ITreeItem
    unionArr: ITreeItem[]
}

/**
 * Генератор древа
 * @param rootUser - центральный пользователь
 * @param unionArr - массив всех родственников для поиска
 * @param alignItems - тип древа (слева, справа, по центру)
 * @param setWidth - callBack для выравнивания компонента детей
 * @constructor
 */
const TreeGenerator: React.FunctionComponent<IProps> = ({rootUser, unionArr, alignItems}) => {

    const getTreeElements: (item: ITreeItem | undefined) => React.ReactElement | null = (item) => {
        if (!item) return null
        const firstElement = item._id === rootUser._id
        const father = getTreeElements(unionArr.find(el => item.parents.father === el._id))
        const mother = getTreeElements(unionArr.find(el => item.parents.mother === el._id))

        return (
            <View
                style={[styles.itemTreeContainer, {alignItems}]}>
                <View style={styles.itemTreeWrapper}>{father}{mother}</View>
                {father && mother ?
                    <HorizontalUnionLineComponent alignItems={alignItems}/>
                    :
                    <>{(father || mother) && <VerticalLineComponent height={7} alignItems={alignItems}/>}</>
                }
                {(father || mother) && <VerticalLineComponent height={30} alignItems={alignItems}/>}
                <BrothersWrapperComponent alignItems={alignItems}
                                          brothers={firstElement ? getBrothers({user: item, unionArr}) : []}>
                    <ItemTreeComponent item={item}/>
                </BrothersWrapperComponent>
            </View>
        )
    }
    return getTreeElements(rootUser)
}

export default TreeGenerator
