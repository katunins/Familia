import React from "react";
import {ActivityIndicator, Text, View} from "react-native";
import globalStyles from "../styles/styles";
import {useSelector} from "react-redux";
import {loaderSelector} from "../store/selectors";
import EStyleSheet from "react-native-extended-stylesheet";

interface IProps {
    title?: string,
}

const HeaderComponent: React.FC<IProps> = ({title = ''}) => {
    const loader = useSelector(loaderSelector)
    return (
        <View style={globalStyles.headerWrapper}>
            <Text style={globalStyles.headerFont}>{title}</Text>
            {loader && <ActivityIndicator size={'small'} color={EStyleSheet.value('$colorGrey')}/>}
        </View>
    )
}
export default HeaderComponent
