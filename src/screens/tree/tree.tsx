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
import {getBrothers, getChildren, getSpouse, itemFromUser} from "../../helpers/tree";
import HorizontalLineComponent from "./horizontalLine";
import item from "./item";
import TreeEmptyElement from "./treeEmpty";

/**
 * Элемент древа
 */
export interface ITreeItem extends IParents {
    _id: string
    name: string
    userPic: string
    type?: string
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

        const rootUser = route.params?.user || user
        // const spouse = getSpouse({user: itemFromUser(rootUser), unionArr})
        const brothers = getBrothers({user: itemFromUser(rootUser), unionArr})
        // const children = getChildren({parent:itemFromUser(rootUser), unionArr})

        navigation.setOptions({headerTitle: rootUser.name, headerShown: true})

        const [scrollDirection, setScrollDirection] = useState('')

        // const getMaxWidth = (data: ITreeRoot[]) => {
        //     let max = 0
        //     data.map(item => {
        //         if (item.parents.length > max) max = item.parents.length
        //         if (item.brothers.length > max) max = item.brothers.length
        //     })
        //     return max
        // }

        return (<ScrollView style={{minWidth: '100%', backgroundColor: 'white'}} horizontal={true} centerContent={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={scrollDirection !== 'vertical'}
                            onScrollBeginDrag={() => setScrollDirection('horizontal')}>
                <ScrollView centerContent={true} showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.itemWrapper}
                            scrollEnabled={scrollDirection !== 'horizontal'}
                            onScrollBeginDrag={() => setScrollDirection('vertical')}>

                    <View style={{flexDirection: 'row'}}>
                        <FlatList data={brothers}
                                  renderItem={({item}) => <ItemTreeComponent item={item}/>}
                                  horizontal={true} scrollEnabled={false}
                                  ListFooterComponent={HorizontalLineComponent}
                        />
                        <ItemTreeComponent item={itemFromUser(rootUser)}/>
                        <FlatList data={brothers}
                                  renderItem={({item}) => <ItemTreeComponent item={null}/>}
                                  horizontal={true} scrollEnabled={false}
                                  ListHeaderComponent={HorizontalLineComponent}
                        />
                    </View>
                    {/*{spouse.length > 0 ? <FlatList data={} renderItem={({item, index}) => <RootWrapperComponent*/}
                    {/*    item={item} width={getMaxWidth(tree.roots)}*/}
                    {/*    position={getTreePosition(index, tree.roots.length)}/>} horizontal={true}/>}*/}


                </ScrollView>
            </ScrollView>
        )
    }
export default TreeScreen
