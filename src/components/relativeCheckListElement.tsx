import React from "react";
import {Pressable, Text, View} from "react-native";
import {IRelative, IRelativeTypes} from "../interfaces/store";
import styles from "./styles";
import CheckIcon from "../ui/svg/checkIcon";
import FastImage from "react-native-fast-image";
import globalStyles from "../styles/styles";
import env, {relativeTypes} from "../config";

interface IProps extends IRelativeTypes {
    item: IRelative,
    checked?: boolean,
    callBack: () => void
}

const RelativeCheckListElementComponent: React.FunctionComponent<IProps> = ({item, type, checked, callBack}) => {
    return (
        <Pressable onPress={callBack} style={[styles.relativeCheckListElementContainer, checked ? styles.relativeCheckListElementChecked : {}]}>
            <View style={styles.imageAndText}>
                {/*@ts-ignore*/}
                <FastImage source={{uri: `${env.endPointUrl}/${item.userPic}`}} style={globalStyles.miniUserPic}/>
                <View style={styles.relativeCheckListElementTextWrapper}>
                    <Text style={globalStyles.boldText}>{item.name}</Text>
                    {/*@ts-ignore*/}
                    <Text  style={globalStyles.lightText}>{relativeTypes[type]}</Text>
                </View>
            </View>
            <CheckIcon checked={checked}/>

        </Pressable>
    )
}
export default RelativeCheckListElementComponent
