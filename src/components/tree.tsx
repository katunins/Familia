import React, {useState} from "react";
import {ITreeItem} from "../screens/tree/item";
import {useSelector} from "react-redux";
import {relativesSelector, userSelector} from "../store/selectors";
import {getChildren, getSpouse, itemFromUser} from "../helpers/tree";
import {View} from "react-native";
import TreeGenerator from "../screens/tree/treeGenerator";
import {treeItemSize} from "../config";
import ChildTreeComponent from "../screens/tree/childTree";
import styles from "../screens/tree/styles";

/**
 * Компонент построения древа
 * @param rootUser - центральный пользователь
 * @constructor
 */
const TreeComponent: React.FunctionComponent<{ rootUser: ITreeItem }> = ({rootUser}) => {
    const user = useSelector(userSelector)
    const relatives = useSelector(relativesSelector)

    // создадим объединенный массив пользователя и родственников только из из нужных элементов
    const unionArr: ITreeItem[] = relatives.map(item => itemFromUser(item))
    unionArr.push(itemFromUser(user))

    const spouse: ITreeItem[] = getSpouse({user: rootUser, unionArr})
    const children = getChildren({parent: rootUser, unionArr})
    // const [containersWidth, setContainersWidth] = useState<number[]>([])
    const [leftContainerWidth, setLeftContainerWidth] = useState(0)
    const [rightContainerWidth, setRightContainerWidth] = useState(0)

    // смещение детей относительно центра, если размещение не по центру
    // const childShift = containersWidth.length > 1 ? (containersWidth[0] - containersWidth[1]) / 2 + treeItemSize.containerWidth : 0
    // const childShift = spouse.length > 0 ? (leftContainerWidth - rightContainerWidth) / 2 + treeItemSize.containerWidth : 0
    const childShift = spouse.length > 0 ? leftContainerWidth - treeItemSize.containerWidth*2 : 0
    return (
        <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                <View onLayout={event => setLeftContainerWidth(event.nativeEvent.layout.width)} style={styles.itemTreeContainer}>
                    <TreeGenerator rootUser={rootUser} unionArr={unionArr}
                                   alignItems={spouse.length > 0 ? 'flex-end' : 'center'}
                    />
                </View>
                {spouse.length > 0 &&
                <View onLayout={event => setRightContainerWidth(event.nativeEvent.layout.width)} style={styles.itemTreeContainer}>
                    <TreeGenerator rootUser={spouse[0]} unionArr={unionArr}
                                   alignItems={'flex-start'}
                        // setWidth={(width) => setContainersWidth(prevState => [...prevState, width])}
                    />
                </View>
                }
            </View>
            <ChildTreeComponent shift={spouse.length > 0 ? childShift : 0} _children={children}/>
        </View>

    )
}

export default TreeComponent
