import React from "react";
import styles from "./styles";
import {View} from "react-native";
import {treeItemSize} from "../../config";
import {ITreePosition} from "./treeGenerator";
import VerticalLineComponent from "./verticalLine"

interface IProps extends ITreePosition {
    invertDirection?: boolean
}

const HorizontalUnionLineComponent: React.FunctionComponent<IProps> = ({alignItems, invertDirection}) => {
    return (
        <View style={styles.horizontalLineWrapper}>
            <View style={[styles.horizontalUnionLine, invertDirection ? {
                borderTopWidth: 1,
                borderTopLeftRadius: alignItems === 'flex-start' ? 0 : 5,
                borderTopRightRadius: alignItems === 'flex-end' ? 0 : 5,
            } : {
                borderBottomWidth: 1,
                borderBottomLeftRadius: alignItems === 'flex-start' ? 0 : 5,
                borderBottomRightRadius: alignItems === 'flex-end' ? 0 : 5,
            }, {
                alignSelf: alignItems,
                marginHorizontal: alignItems !== 'center' ? treeItemSize.containerWidth / 2 : 0
            }]}/>
        </View>
    )
}

export default HorizontalUnionLineComponent
