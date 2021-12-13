import React, {useState} from "react";
import {FlatList, View} from "react-native";
import styles from "./styles";
import ItemTreeComponent, {ITreeItem} from "./item";
import VerticalLineComponent from "./verticalLine";
import HorizontalUnionLineComponent from "./horizontalLine";
import BrothersWrapperComponent from "./brothersWrapper";
import {getBrothers, getChildren, itemBadge} from "../../helpers/tree";
import {CommonActions, useNavigation} from "@react-navigation/native";


export interface ITreePosition {
    alignItems: 'flex-start' | 'center' | 'flex-end'
}

interface IGetTreeElements extends ITreePosition {
    item: ITreeItem | undefined
    level: number
}

interface ITreeGenerator extends ITreePosition {
    rootUser: ITreeItem
    setRootUser: (user: ITreeItem) => void
    unionArr: ITreeItem[]
    root?: boolean
    spouse?: boolean
}

/**
 * Генератор древа
 * @param rootUser - центральный пользователь
 * @param unionArr - массив всех родственников для поиска
 * @param alignItems - тип древа (слева, справа, по центру)
 * @param root - главный пользователь в древе
 * @constructor
 */
const TreeGenerator: React.FunctionComponent<ITreeGenerator> = ({
                                                                    rootUser,
                                                                    spouse,
                                                                    setRootUser,
                                                                    unionArr,
                                                                    alignItems,
                                                                    root
                                                                }) => {

    const getTreeElements: (data: IGetTreeElements) => React.ReactElement | null = ({item, alignItems, level}) => {
        if (!item) return null
        const onPress = () => {
            if (item._id === rootUser._id && !spouse) return
            setRootUser(item)
        }
        const firstElement = item._id === rootUser._id
        level++
        const parentsArr = Object.keys(item.parents).map(parentType => getTreeElements({
                item: unionArr.find(el => item.parents[parentType] === el._id),
                alignItems: item.parents[parentType] === 'father' ? 'flex-start' : 'flex-end', level
            })
        ).filter(item => item)
        return (
            <View
                style={[styles.itemTreeContainer, {alignItems},
                    // {backgroundColor: '#'+((1<<24)*Math.random() | 0).toString(16)}
                ]}>
                <View style={styles.itemTreeWrapper}>
                    {parentsArr[0]}
                    {parentsArr[1]}
                </View>
                {parentsArr.length > 1 ?
                    <HorizontalUnionLineComponent alignItems={alignItems}/>
                    :
                    <>{parentsArr.length > 0 && <VerticalLineComponent height={7} alignItems={alignItems}/>}</>
                }
                {parentsArr.length > 0 && <VerticalLineComponent height={30} alignItems={alignItems}/>}
                <View style={{flexDirection: 'row'}}>
                    <BrothersWrapperComponent alignItems={alignItems} unionArr={unionArr}
                                              brothers={firstElement ? getBrothers({user: item, unionArr}) : []}
                                              setRootUser={setRootUser}
                    >
                        <ItemTreeComponent
                            item={item}
                            root={root && firstElement}
                            // badge={itemBadge({item, unionArr})}
                            onPress={onPress}
                        />
                    </BrothersWrapperComponent>
                </View>
            </View>
        )
    }
    return getTreeElements({item: rootUser, alignItems, level: 0})
}

export default TreeGenerator
