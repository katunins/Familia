import React, {SyntheticEvent, useState} from "react";
import {useSelector} from "react-redux";
import {relativesSelector, userSelector} from "../../store/selectors";
import {getChildren, getSpouse, itemFromUser} from "../../helpers/tree";
import {FlatList, LayoutChangeEvent, Text, View} from "react-native";
import styles from "./styles";
import ItemTreeComponent, {ITreeItem} from "./item";
import {containerWidth} from "../../helpers/utils";


export interface ITreePosition {
    alignItems: 'flex-start' | 'center' | 'flex-end'
}

interface IProps extends ITreePosition {
    rootUser: ITreeItem
    unionArr: ITreeItem[]
}

const TreeGenerator: React.FunctionComponent<IProps> = ({rootUser, unionArr, alignItems}) => {

    const [containerWidth, setContainerWidth] = useState(0)
    const onLayout = (event: LayoutChangeEvent) => {
        const {width} = event.nativeEvent.layout
        if (width > containerWidth) setContainerWidth(width)
    }

    const getTreeElements: (item: ITreeItem | undefined) => React.ReactElement | null = (item) => {
        if (!item) return null
        const firstElement = item._id === rootUser._id
        const father = getTreeElements(unionArr.find(el => item.parents.father === el._id))
        const mother = getTreeElements(unionArr.find(el => item.parents.mother === el._id))
        return (
            <View
                style={[styles.itemTreeContainer, {alignItems}, (firstElement && alignItems !== 'center') ? {minWidth: 400} : {}]}
                onLayout={firstElement ? onLayout : () => {
                }}
            >
                <View style={{flexDirection: 'row'}}>{father}{mother}</View>
                <ItemTreeComponent item={item}/>
            </View>
        )
    }
    return getTreeElements(rootUser
    )
}

const TreeComponent: React.FunctionComponent<{ rootUser: ITreeItem }> = ({rootUser}) => {
    const user = useSelector(userSelector)
    const relatives = useSelector(relativesSelector)

    // создадим объединенный массив пользователя и родственников только из из нужных элементов
    const unionArr: ITreeItem[] = relatives.map(item => itemFromUser(item))
    unionArr.push(itemFromUser(user))

    const spouse = []//getSpouse({user: rootUser, unionArr})
    const children = getChildren({parent: rootUser, unionArr})

    return (
        <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                <TreeGenerator rootUser={rootUser} unionArr={unionArr}
                               alignItems={spouse.length > 0 ? 'flex-end' : 'center'}/>
                {spouse.length > 0 &&
                <TreeGenerator rootUser={spouse[0]} unionArr={unionArr}
                               alignItems={'flex-start'}/>}
            </View>
            <FlatList data={children} renderItem={({item}) => <ItemTreeComponent item={item}/>} horizontal={true}
                      scrollEnabled={false}/>
        </View>

    )
}

export default TreeComponent
