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
const TreeComponent: React.FunctionComponent<{ rootUser: ITreeItem, setRootUser: (user: ITreeItem) => void }> =
    ({
         rootUser,
         setRootUser
     }) => {
        const user = useSelector(userSelector)
        const relatives = useSelector(relativesSelector)

        // создадим объединенный массив пользователя и родственников только из из нужных элементов
        const unionArr: ITreeItem[] = relatives.map(item => itemFromUser(item))
        unionArr.push(itemFromUser(user))

        const spouse: ITreeItem[] = getSpouse({user: rootUser, unionArr})
        const children = getChildren({parent: rootUser, unionArr})

        // ширины главных контейнеров
        const [leftContainerWidth, setLeftContainerWidth] = useState(0)
        const [rightContainerWidth, setRightContainerWidth] = useState(0)

        const childShift = spouse.length > 0 ? leftContainerWidth - rightContainerWidth : 0
        return (
            <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <View onLayout={event => setLeftContainerWidth(event.nativeEvent.layout.width)}
                          style={[styles.itemTreeContainer]}>
                        <TreeGenerator rootUser={rootUser} unionArr={unionArr}
                                       alignItems={spouse.length > 0 ? 'flex-end' : 'center'}
                                       root setRootUser={setRootUser}/>
                    </View>
                    {spouse.length > 0 &&
                    <View onLayout={event => setRightContainerWidth(event.nativeEvent.layout.width)}
                          style={styles.itemTreeContainer}>
                        <TreeGenerator rootUser={spouse[0]} unionArr={unionArr}
                                       alignItems={'flex-start'} setRootUser={setRootUser}
                                       spouse/>
                    </View>
                    }
                </View>
                <ChildTreeComponent shift={childShift} _children={children} unionArr={unionArr}
                                    setRootUser={setRootUser} spouse={spouse}/>
            </View>

        )
    }

export default TreeComponent
