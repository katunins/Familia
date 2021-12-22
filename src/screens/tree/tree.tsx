import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {relativesSelector, rootUserSelector, userSelector} from "../../store/selectors";
import styles from "./styles";
import TreeComponent from "../../components/tree";
import {useNavigation} from "@react-navigation/native";
import HomeButtonComponent from "../../components/home";
import {getTreeRelatives} from "./treeParser";
import {setRootUser} from "../../store/slice/tree.slice";

const TreeScreen: React.FunctionComponent = () => {

    const user = useSelector(userSelector)
    const relatives = useSelector(relativesSelector)
    const rootUser = useSelector(rootUserSelector)

    const navigation = useNavigation()

    const dispatch = useDispatch()
    const resetHomeRootUser = () => dispatch(setRootUser(user))
    const {spouse, children, brothers} = useMemo(() => getTreeRelatives(rootUser, [...relatives, user]), [rootUser, relatives, user])

    // кнопка возврата в главого пользователя
    const headerLeft = rootUser._id !== user._id ? () => <HomeButtonComponent onPress={resetHomeRootUser}/> : undefined

    useLayoutEffect(() => {
        navigation.setOptions({title: rootUser.name, headerLeft})
    }, [navigation, rootUser])

    return (
        <ScrollView
            style={{minWidth: '100%', backgroundColor: 'white'}} horizontal={true} centerContent={true}
            showsHorizontalScrollIndicator={false}
        >
            <ScrollView
                centerContent={true} showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.itemWrapper}
            >
                <TreeComponent spouse={spouse} brothers={brothers}
                               children={children}/>
            </ScrollView>
        </ScrollView>
    )
}
export default TreeScreen
