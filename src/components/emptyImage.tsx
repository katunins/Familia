import React from "react";
import FastImage from "react-native-fast-image";
import {emptyImage} from "../config";

const EmptyImageComponent:React.FunctionComponent = () => {
    return (
        <FastImage
            style={{width: '100%', height: 200}}
            resizeMode={'contain'}
            source={emptyImage}
        />
    )
}
export default EmptyImageComponent
