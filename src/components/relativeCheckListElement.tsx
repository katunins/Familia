import React from "react";
import {Pressable, Text, View} from "react-native";
import {IRelative} from "../interfaces/store";
import styles from "./styles";
import CheckIcon from "../ui/svg/checkIcon";
import FastImage from "react-native-fast-image";
import globalStyles from "../styles/styles";
import {relativeTypes} from "../config";

interface IProps {
    item: IRelative,
    checked?: boolean,
    callBack: () => void
}

const RelativeCheckListElementComponent: React.FunctionComponent<IProps> = ({item, checked, callBack}) => {

    return (
        <Pressable onPress={callBack} style={[styles.relativeCheckListElementContainer, checked ? styles.relativeCheckListElementChecked : {}]}>
            <View style={styles.imageAndText}>
                {/*@ts-ignore*/}
                <FastImage source={{uri: item.userPic}} style={globalStyles.miniUserPic}/>
                <View style={styles.relativeCheckListElementTextWrapper}>
                    <Text style={globalStyles.bigThinText}>{item.name}</Text>
                    {/*@ts-ignore*/}
                    <Text  style={globalStyles.boldText}>{relativeTypes[item.type]}</Text>
                </View>
            </View>
            <CheckIcon checked={checked}/>

        </Pressable>
    )
}
export default RelativeCheckListElementComponent
