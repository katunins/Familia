import React from "react";
import {Pressable, Text, View} from "react-native";
import styles from "./styles";
import AutoHeightImageComponent from "./autoHeightImage";
import env from "../config";
import {IImageUri} from "../interfaces/store";

interface IProps {
    width?: number,
    callBack?: () => void
    imageUriArr:IImageUri[]
}

const ImageAndCountComponent: React.FunctionComponent<IProps> = ({imageUriArr, callBack}) => {
    return (
        <View>
            <AutoHeightImageComponent imageUri={imageUriArr[0]}/>
            {imageUriArr.length > 1 &&
            <Pressable onPress={callBack}>
                <Text style={styles.imageAndCountLabel}>{`+ ${imageUriArr.length - 1}`}</Text>
            </Pressable>}
        </View>
    )
}
export default ImageAndCountComponent
