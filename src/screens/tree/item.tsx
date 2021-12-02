import React from "react";
import {ImageProps, Pressable, StyleProp, Text, View, ViewStyle} from "react-native";
import FastImage from "react-native-fast-image";
import {uriParse} from "../../helpers/utils";
import {treeItemSize} from "../../config";
import styles from "./styles";
import {ITreeItem} from "./tree";

interface IProps {
    item: ITreeItem | null
    onPress?: () => void
}

const ItemTreeComponent: React.FunctionComponent<IProps> =
    ({
         item,
         onPress,
     }) => {
        const stylesArr = [styles.itemWrapper, {
            marginVertical: treeItemSize.marginVertical,
            marginHorizontal: treeItemSize.marginHorizontal,
            width: treeItemSize.containerWidth,
        }]
        if (!item) return <View style={stylesArr}/>
        const {name, userPic} = item
        const imageStyle: StyleProp<ImageProps> = {style: {
                width: treeItemSize.width,
                height: treeItemSize.height,
                ...styles.container
            }}
        return (
            <View style={styles.verticalLineWrapper}>
                <Pressable onPress={onPress}
                           style={stylesArr}>
                    <FastImage style={imageStyle} source={uriParse(userPic)} resizeMode={'cover'}/>
                    <View style={styles.nameWrapper}><Text numberOfLines={3} style={styles.name}>{name}</Text></View>
                </Pressable>
            </View>
        )
    }

export default ItemTreeComponent
