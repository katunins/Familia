import React from "react";
import {Pressable, Text, View} from "react-native";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import {uriParse} from "../../helpers/utils";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../interfaces/navigation";
import globalStyles from "../../styles/styles";
import {treeItemSize} from "../../config";
import PlusIcon from "../../ui/svg/plusIcon";
import VerticalLineComponent from "./verticalLine";
import {ITreeLine} from "./lineBlock";

export interface IItemTree {
    uri: string
    name: string
    type?: string
    onPress?: () => void
}

interface IProps {
    item: IItemTree
    scale: number
    between?: number
    bottomLine?: boolean
    topLine?: boolean
}

const ItemTreeComponent: React.FunctionComponent<IProps> =
    ({
         item,
         scale,
         bottomLine,
         topLine,
         between = 0
     }) => {
        const {onPress, name, uri, type} = item
        const imageStyle = {
            width: treeItemSize.width * scale,
            height: treeItemSize.height * scale,
            ...styles.container
        }
        return (
            <View style={styles.verticalLineWrapper}>
                {topLine && <VerticalLineComponent scale={scale}/>}
                <Pressable onPress={onPress}
                           style={[styles.itemWrapper, {
                               marginVertical: treeItemSize.margin,
                               marginHorizontal: (treeItemSize.margin + between * (treeItemSize.containerWidth + treeItemSize.margin * 2) / 2) * scale,
                               width: treeItemSize.containerWidth * scale
                           }]}>
                    {/*@ts-ignore*/}
                    <FastImage style={imageStyle} source={uriParse(uri)} resizeMode={'cover'}/>
                    <Text style={styles.name}>{name}</Text>
                    {type && <Text style={styles.type}>{type}</Text>}
                </Pressable>
                {bottomLine && <VerticalLineComponent scale={scale}/>}
            </View>
        )
    }

export default ItemTreeComponent
