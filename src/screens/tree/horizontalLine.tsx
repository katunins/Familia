import React from "react";
import {View} from "react-native";
import styles from "./styles";
import {treeItemSize} from "../../config";

const HorizontalLineComponent: React.FunctionComponent<{ scale: number, width: number }> = ({scale, width}) => {
    return (
        <View style={[styles.horizontalLine, {width: width * scale}]}/>
    )
}

export default HorizontalLineComponent
