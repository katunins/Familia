import React from "react";
import {View} from "react-native";
import {treeItemSize} from "../../config";
import styles from "./styles";

const EmptyTreeComponent: React.FunctionComponent = () => {
    const stylesArr = [styles.itemWrapper, {
        marginVertical: treeItemSize.marginVertical,
        marginHorizontal: treeItemSize.marginHorizontal,
        width: treeItemSize.containerWidth,
    }]
    return (
        <View style={styles.verticalLineWrapper}>
            <View style={stylesArr}/>
        </View>
    )
}
export default EmptyTreeComponent
