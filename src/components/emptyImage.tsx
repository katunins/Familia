import React from "react";
import FastImage from "react-native-fast-image";

const EmptyImageComponent:React.FunctionComponent = () => {
    return (
        <FastImage
            style={{width: '100%', height: 200}}
            resizeMode={'contain'}
            source={require('../ui/images/retroCamera.jpg')}
        />
    )
}
export default EmptyImageComponent
