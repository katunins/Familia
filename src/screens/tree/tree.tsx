import React, {useEffect, useState} from "react";
import {ScrollView, View, FlatList, Text} from "react-native";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../interfaces/navigation";
import {relativesSelector, userSelector} from "../../store/selectors";
import {useSelector} from "react-redux";
import {IParents} from "../../interfaces/store";
import {maxHorizontalTreeItems, treeBuilder} from "../../helpers/treeBuilder";
import WrapperLine from "./wrapperLine";
import VerticalLineComponent from "./verticalLine";
import ItemTreeComponent from "./item";
import styles from "./styles";
import {getTreePosition} from "../../helpers/utils";
import TreeElementComponent from "./treeElement";
import TreeFamilyComponent from "./treeFamily";

/**
 * Элемент древа
 */
export interface ITreeItem extends IParents {
    _id: string
    name: string
    userPic: string
    type?: string
}

export interface ITreeRoot {
    item: ITreeItem
    parents: {
        parent: ITreeItem
        grandParents: ITreeItem[]
    }[]
    brothers: ITreeItem[]
}

export interface ITree {
    roots: ITreeRoot[]
    children: ITreeItem[]
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

        const rootUser = route.params?.user || user
        const [tree, setTree] = useState<ITree>(treeBuilder({relatives, user, item: user}))
        const [scrollDirection, setScrollDirection] = useState('')

        useEffect(() => {
            navigation.setOptions({headerTitle: rootUser.name, headerShown: true})
            setTree(treeBuilder({relatives, user, item: user}))
        }, [relatives])

        return (<ScrollView style={{minWidth: '100%', backgroundColor: 'white'}} horizontal={true} centerContent={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={scrollDirection !== 'vertical'}
                            onScrollBeginDrag={() => setScrollDirection('horizontal')}>
                <ScrollView centerContent={true} showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.itemWrapper}
                            scrollEnabled={scrollDirection !== 'horizontal'}
                            onScrollBeginDrag={() => setScrollDirection('vertical')}>

                    {/*Зона родителей, братьев и бабушек*/}

                    <View style={styles.parentsContainer}>
                        {tree.roots.map((item, index) =>
                            <View style={{marginHorizontal: 20, justifyContent: 'flex-end'}} key={index}>
                                <TreeFamilyComponent treeElement={}/>
                                {/*<TreeElementComponent*/}
                                {/*    element={item} position={getTreePosition(index, tree.roots.length)}*/}
                                {/*    width={maxHorizontalTreeItems(tree.roots)}/>*/}
                            </View>
                        )}
                    </View>

                    {/*Зона детей*/}
                    {tree.children.length > 0 &&
                    <>
                        <WrapperLine items={tree.roots.length} type={'top'} position={'center'}/>
                        <VerticalLineComponent/>
                        <WrapperLine items={tree.children.length} type={'bottom'} position={'center'}/>
                        <FlatList data={tree.children} renderItem={({item}) => <ItemTreeComponent item={item}/>}
                                  horizontal={true} scrollEnabled={false}/>
                    </>
                    }
                </ScrollView>
            </ScrollView>
        )
    }
export default TreeScreen
