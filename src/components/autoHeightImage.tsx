import React, {useState} from "react";
import FastImage from "react-native-fast-image";
import {Dimensions, Text} from "react-native";
import {uriParse} from "../helpers/utils";

export interface IAutoHeightImageComponent {
    uri: string,
    width?: number
}

const AutoHeightImageComponent: React.FunctionComponent<IAutoHeightImageComponent> =
    ({
         uri,
         width = Dimensions.get('window').width,
     }) => {
        const [ratio, setRatio] = useState(1)
        const [showLoader, setShowLoader] = useState(false)
        return (
                <FastImage
                    style={{width, height: width * ratio}}
                    source={showLoader ? require('../ui/images/fastimage_loader.jpg'):uriParse(uri)}
                    onLoadStart={()=>setShowLoader(true)}
//                     onLoadEnd={()=>setShowLoader(false)}
                    onLoad={event => {
                        const {width, height} = event.nativeEvent
                        setShowLoader(false)
                        setRatio(height / width)
                    }}
                />
        )
    }
export default AutoHeightImageComponent
