import React, {useState} from "react";
import {ScrollView} from "react-native";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/selectors";
import {itemFromUser} from "../../helpers/tree";
import styles from "./styles";
import TreeComponent from "../../components/tree";
import {useNavigation} from "@react-navigation/native";
import HomeButtonComponent from "../../components/home";

const TreeScreen: React.FunctionComponent = () => {

    const user = useSelector(userSelector)
    const initRootUser = itemFromUser(user) // пользователь по-умолчанию
    const [rootUser, setRootUser] = useState(initRootUser)

    const navigation = useNavigation()
    navigation.setOptions({
        title: rootUser.name,
        headerLeft: rootUser._id !== initRootUser._id ? () => <HomeButtonComponent
            onPress={() => setRootUser(initRootUser)}/> : undefined
    })

    return (
        <ScrollView
            style={{minWidth: '100%', backgroundColor: 'white'}} horizontal={true} centerContent={true}
            showsHorizontalScrollIndicator={false}
        >
            <ScrollView
                centerContent={true} showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.itemWrapper}
            >
                <TreeComponent rootUser={rootUser} setRootUser={setRootUser}/>
            </ScrollView>
        </ScrollView>
    )
}
export default TreeScreen
