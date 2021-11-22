import React from "react";
import {View} from "react-native";
import styles from "./styles";
import {treeItemSize} from "../../config";
const VerticalLineComponent:React.FunctionComponent<{scale:number, long?:boolean}> = ({scale, long}) => {
    return (
        <View style={[styles.verticalLine, {height: (long ? treeItemSize.verticalLongLine : treeItemSize.verticalLine) * scale}]}/>
    )
}

export default VerticalLineComponent
