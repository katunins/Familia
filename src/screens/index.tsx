import React, {useEffect} from "react";
import {SafeAreaView, View} from "react-native";
import {TabsNavigator} from "../navigation";
import ModalScreen from "./modal";
import {useDispatch, useSelector} from "react-redux";
import Loader from "./loader";
import {loaderSelector, modalSelector, userSelector} from "../store/selectors";
import globalStyles from "../styles/styles";
import {actionCheckAuth} from "../store/slice/user.slice";

const Screens = () => {

    const selectModal = useSelector(modalSelector);
    const user = useSelector(userSelector)

    const dispatch = useDispatch()
    const checkAuth = () => {
        if (Object.keys(user).length === 0) return
        dispatch(actionCheckAuth())
    }
    useEffect(checkAuth, [])
    return (
        <SafeAreaView style={globalStyles.body} >
            <TabsNavigator/>
            {selectModal.active && <ModalScreen
                {...selectModal.data}
            />}
        </SafeAreaView>
    );
};

export default Screens;
