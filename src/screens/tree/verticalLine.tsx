import {View, ViewStyle} from "react-native";
import React from "react";

const VerticalLineComponent:React.FunctionComponent<ViewStyle> = ({alignItems = 'center'}) => {
    return <View style={{width: 1, height: 30, backgroundColor: 'grey', alignSelf: alignItems}}/>
}

export default VerticalLineComponent
