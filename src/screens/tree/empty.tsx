import React from "react";
import {Pressable, Text, View} from "react-native";
import styles from "./styles";
import PlusIcon from "../../ui/svg/plusIcon";
import {treeItemSize} from "../../config";
import VerticalLineComponent from "./verticalLine";
import FastImage from "react-native-fast-image";
import {uriParse} from "../../helpers/utils";

interface IProps {
    onPress?: () => void
    scale: number
    aboveLine?: boolean
}

const EmptyTreeComponent: React.FunctionComponent<IProps> = ({onPress, scale, aboveLine=true}) => {
    const imageStyle = {
        width: treeItemSize.width * scale,
        height: treeItemSize.height * scale,
        ...styles.container
    }
    return (
        <View style={styles.verticalLineWrapper}>
            {aboveLine && <VerticalLineComponent scale={scale}/>}
            <Pressable onPress={onPress} style={[styles.itemWrapper, {margin: treeItemSize.margin*scale, width: treeItemSize.containerWidth*scale}]}>
                <View style={imageStyle}>
                    <PlusIcon/>
                </View>
            </Pressable>
            {!aboveLine && <VerticalLineComponent scale={scale}/>}
        </View>
    )
}

export default EmptyTreeComponent
