import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState} from "react";
import {ScrollView} from "react-native";
import {useSelector} from "react-redux";
import {relativesSelector, userSelector} from "../../store/selectors";
import styles from "./styles";
import TreeComponent from "../../components/tree";
import {useNavigation} from "@react-navigation/native";
import HomeButtonComponent from "../../components/home";
import {getBrothers, getChildren, getSpouse, itemFromUser, loadUnionArr} from "./treeBase";

const TreeScreen: React.FunctionComponent = () => {

    const user = useSelector(userSelector)
    const relatives = useSelector(relativesSelector)
    useMemo(() => loadUnionArr({user, relatives}), [user, relatives])

    const initRootUser = itemFromUser(user) // пользователь по-умолчанию
    const [rootUser, setRootUser] = useState(initRootUser)

    const spouse = useMemo(()=>getSpouse(rootUser), [rootUser])
    const children = useMemo(()=>getChildren(rootUser), [rootUser])
    const brothers = useMemo(()=>getBrothers(rootUser), [rootUser])

    const navigation = useNavigation()
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: rootUser.name,
            headerLeft: rootUser._id !== initRootUser._id ? () => <HomeButtonComponent
                onPress={() => setRootUser(initRootUser)}/> : undefined
        })
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
                <TreeComponent rootUser={rootUser} setRootUser={setRootUser} spouse={spouse} brothers={brothers} children={children}/>
            </ScrollView>
        </ScrollView>
    )
}
export default TreeScreen
