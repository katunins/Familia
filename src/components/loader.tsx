import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import {ActivityIndicator, View} from "react-native";
import styles from "./styles";
import {useSelector} from "react-redux";
import {loaderSelector} from "../store/selectors";
import globalStyles from "../styles/styles";

const LoaderComponent: React.FunctionComponent = () => {
    const loader = useSelector(loaderSelector)
    return (
        <View style={globalStyles.headerWrapper}>
            {loader && <ActivityIndicator size={'small'} color={EStyleSheet.value('$colorGrey')}/>}
        </View>
    )
}

export default LoaderComponent
