import React from "react";
import {Pressable, Text, View} from "react-native";

interface IProps {
    callBack: () => void
    // Icon: React.ReactElement
    title: string
}

const AddPostButtonComponent: React.FunctionComponent<IProps> = ({
                                                                     title,
                                                                     // Icon,
                                                                     callBack}) => {
    return (
        <Pressable onPress={callBack}>
            <View>
                {/*<Icon/>*/}
                <Text>{title}</Text>
            </View>
        </Pressable>
    )
}
export default AddPostButtonComponent
