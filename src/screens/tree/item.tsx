import React from "react";
import {Pressable, Text, View} from "react-native";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import {uriParse} from "../../helpers/utils";
import {treeItemSize} from "../../config";
import {ITreeItem} from "./tree";

interface IProps {
    item: ITreeItem
    onPress?: ()=>void
}
const ItemTreeComponent: React.FunctionComponent<IProps> =
    ({
         item,
        onPress,
     }) => {
        const {name, userPic} = item
        const imageStyle = {
            width: treeItemSize.width,
            height: treeItemSize.height,
            ...styles.container
        }
        return (
            <View style={styles.verticalLineWrapper}>
                <Pressable onPress={onPress}
                           style={[styles.itemWrapper, {
                               marginVertical: treeItemSize.marginVertical,
                               marginHorizontal: treeItemSize.marginHorizontal,
                               width: treeItemSize.containerWidth,
                           }]}>
                    {/*@ts-ignore*/}
                    <FastImage style={imageStyle} source={uriParse(userPic)} resizeMode={'cover'}/>
                    <Text style={styles.name}>{name}</Text>
                </Pressable>
            </View>
        )
    }

export default ItemTreeComponent
