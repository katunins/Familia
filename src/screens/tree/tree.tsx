import React, {useEffect, useState} from "react";
import {ScrollView, View, FlatList, Text} from "react-native";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../interfaces/navigation";
import {relativesSelector, userSelector} from "../../store/selectors";
import {useSelector} from "react-redux";
import {IParents, IUser} from "../../interfaces/store";
import WrapperLine from "./wrapperLine";
import VerticalLineComponent from "./verticalLine";
import ItemTreeComponent from "./item";
import styles from "./styles";
import {getTreePosition} from "../../helpers/utils";
import TreeElementComponent from "./treeElement";
import TreeFamilyComponent from "./treeFamily";
import RootWrapperComponent from "./rootWrapper";
import {getBrothers, getChildren, getMaxWidth, getSpouse, itemFromUser} from "../../helpers/tree";
import HorizontalLineComponent from "./horizontalLine";
import item from "./item";
import TreeEmptyElement from "./treeEmpty";
import TreeRootLineComponent from "./treeLine";

/**
 * Элемент древа
 */
export interface ITreeItem extends IParents {
    _id: string
    name: string
    userPic: string
    type?: string
}

export interface IRootItem {
    item: ITreeItem,
    brothers: ITreeItem[]
}

/**
 *
 * @param route.user - пользователь от которого нужно построить древе
 * @param navigation
 * @constructor
 */
const TreeScreen: React.FunctionComponent<NativeStackScreenProps<RootStackParamList, 'TreeScreen'>> =
    ({
         route,
         navigation
     }) => {
        const user = useSelector(userSelector)
        const relatives = useSelector(relativesSelector)

        // создадим объединенный массив пользователя и родственников только из из нужных элементов
        const unionArr: ITreeItem[] = relatives.map(item => itemFromUser(item))
        unionArr.push(itemFromUser(user))

        const rootUser = itemFromUser(route.params?.user || user)
        const spouse = getSpouse({user: rootUser, unionArr})
        const brothers = getBrothers({user: rootUser, unionArr})

        const rootItems: IRootItem[] = [{
            item: rootUser,
            brothers
        }]
        if (spouse.length > 0) rootItems.push({item: spouse[0], brothers: []})
        // const children = getChildren({parent:itemFromUser(rootUser), unionArr})

        navigation.setOptions({headerTitle: rootUser.name, headerShown: true})

        const [scrollDirection, setScrollDirection] = useState('')

        return (
            <ScrollView style={{minWidth: '100%', backgroundColor: 'white'}} horizontal={true} centerContent={true}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={scrollDirection !== 'vertical'}
                        onScrollBeginDrag={() => setScrollDirection('horizontal')}>
                <ScrollView centerContent={true} showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.itemWrapper}
                            scrollEnabled={scrollDirection !== 'horizontal'}
                            onScrollBeginDrag={() => setScrollDirection('vertical')}>


                    <FlatList
                        data={rootItems}
                        renderItem={({item, index}) =>
                            <RootWrapperComponent
                                item={item} width={getMaxWidth(rootItems)}
                                position={getTreePosition(index, rootItems.length)}
                                unionArr={unionArr}
                            />} horizontal={true} scrollEnabled={false}
                        contentContainerStyle={{alignItems: 'flex-end'}}
                    />


                </ScrollView>
            </ScrollView>
        )
    }
export default TreeScreen
