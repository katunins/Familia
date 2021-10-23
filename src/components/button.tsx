import React from "react";
import {Pressable, StyleProp, Text, View} from "react-native";
import styles from "./styles";

export interface IButtonsProps {
    type?: 'invert',
    customStyle?: StyleProp<View>,
    title: string,
    callBack?: () => void
    icon?: React.ReactElement
    disabled?: boolean
}

const ButtonComponent: React.FunctionComponent<IButtonsProps> = ({type, customStyle, title, callBack, icon, disabled}) => {

    return (
        <Pressable onPress={callBack} disabled={disabled}
            // @ts-ignore
                   style={[styles.buttonWrapper, type ? styles[`buttonType__${type}`] : {}, customStyle || {}, disabled ? styles.disabledButton : {}]} >
    {
        icon && <View style={styles.buttonIconWrapper}>{icon}</View>
    }
    <Text
        // @ts-ignore
        style={[styles.buttonText, type ? styles[`buttonTextType__${type}`] : {}]}>{title}</Text>
</Pressable>
)
}

export default ButtonComponent