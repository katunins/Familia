import React from "react";
import {Pressable, StyleProp, Text, View} from "react-native";
import FastImage, {ImageStyle} from "react-native-fast-image";
import {uriParse} from "../../helpers/utils";
import {treeItemSize} from "../../config";
import styles from "./styles";
import {IParents} from "../../interfaces/store";


/**
 * Элемент древа
 */
export interface ITreeItem extends IParents {
    _id: string
    name: string
    userPic: string
    // type?: string
}

interface IProps {
    item: ITreeItem
    onPress?: () => void
    root?: boolean
    badge?: string
}

const ItemTreeComponent: React.FunctionComponent<IProps> =
    ({
         item,
         onPress,
         root, badge
     }) => {
        const stylesArr = [styles.itemWrapper, {
            marginVertical: treeItemSize.marginVertical,
            marginHorizontal: treeItemSize.marginHorizontal,
            width: treeItemSize.containerWidth,
        }]

        // @ts-ignore
        const imageStyle: StyleProp<ImageStyle> = {
            width: treeItemSize.width,
            height: treeItemSize.height,
            ...styles.container,
        }
        const {name, userPic} = item
        return (
            <View style={styles.verticalLineWrapper}>
                <Pressable onPress={onPress}
                           style={stylesArr}>
                    <FastImage style={imageStyle} source={uriParse(userPic)} resizeMode={'cover'}/>
                    {badge && <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>{badge}</Text>
                    </View>}
                    <View style={styles.nameWrapper}>
                        <Text numberOfLines={3} style={[styles.name, {color: root ? 'red' : undefined}]}>{name}</Text>
                    </View>
                </Pressable>

            </View>
        )
    }

export default ItemTreeComponent
