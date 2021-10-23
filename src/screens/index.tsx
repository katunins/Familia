import React from "react";
import {SafeAreaView, View} from "react-native";
import {TabsNavigator} from "../navigation";
import ModalScreen from "./modal";
import { useSelector } from "react-redux";
import Loader from "./loader";
import {loaderSelector, modalSelector} from "../store/selectors";
import globalStyles from "../styles/styles";

const Screens = () => {

    const selectModal = useSelector(modalSelector);
    const selectLoader = useSelector(loaderSelector);

    return (
        <SafeAreaView style={globalStyles.body}>
            <TabsNavigator/>
            {selectModal.active && <ModalScreen
                title={selectModal.data.title}
                bodyText={selectModal.data.bodyText}
                buttons={selectModal.data.buttons}
            />}
            {selectLoader && <Loader/>}
        </SafeAreaView>
    );
};

export default Screens;
