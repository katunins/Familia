import React from "react";
import {treeItemSize} from "../../config";
import {View} from "react-native";
import {ITreePosition} from "./treeGenerator";
import styles from "./styles";

interface IProps extends ITreePosition {
    height: number
}

const VerticalLineComponent: React.FunctionComponent<IProps> = ({height, alignItems}) => {
    return <View style={[styles.verticalLine, {
        height: height,
        alignSelf: alignItems,
        marginHorizontal: alignItems !== 'center' ? treeItemSize.containerWidth / 2 : 0
    }]}/>
}

export default VerticalLineComponent
