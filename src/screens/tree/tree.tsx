import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {relativesSelector, rootUserIdSelector, userSelector} from "../../store/selectors";
import styles from "./styles";
import TreeComponent from "../../components/tree";
import {useNavigation} from "@react-navigation/native";
import HomeButtonComponent from "../../components/home";
import {getTreeRelatives, getUserById} from "./treeParser";
import {setRootUserId} from "../../store/slice/rootUserId.slice";

const TreeScreen: React.FunctionComponent = () => {

    const user = useSelector(userSelector)
    const relatives = useSelector(relativesSelector)
    const rootUserId = useSelector(rootUserIdSelector)

    const navigation = useNavigation()

    const dispatch = useDispatch()
    const resetHomeRootUser = () => dispatch(setRootUserId(user._id))
    const {spouse, children, brothers} = useMemo(() => getTreeRelatives(rootUserId, [...relatives, user]), [rootUserId, relatives, user])

    // кнопка возврата в главого пользователя
    const headerLeft = rootUserId !== user._id ? () => <HomeButtonComponent onPress={resetHomeRootUser}/> : undefined

    useLayoutEffect(() => {
        const rootUser = getUserById(rootUserId, [...relatives, user])
        navigation.setOptions({title:rootUser.name, headerLeft})
    }, [navigation, rootUserId])

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
