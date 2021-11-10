import React from "react";
import {Pressable, Text, View} from "react-native";
import styles from "./styles";
import AutoHeightImageComponent from "./autoHeightImage";

interface IProps {
    width?: number,
    callBack?: () => void
    uriArr: string[]
}

const ImageAndCountComponent: React.FunctionComponent<IProps> = ({uriArr, callBack}) => {
    return (
        <View>
            <AutoHeightImageComponent uri={uriArr[0]}/>
            {uriArr.length > 1 &&
            <Pressable onPress={callBack}>
                <Text style={styles.imageAndCountLabel}>{`+ ${uriArr.length - 1}`}</Text>
            </Pressable>}
        </View>
    )
}
export default ImageAndCountComponent
