import React, {useState} from "react";
import FastImage from "react-native-fast-image";
import {Dimensions, Image} from "react-native";
import {IImageUri} from "../interfaces/store";
import env from "../config";

interface IProps {
    imageUri:IImageUri
    width?: number
}

const AutoHeightImageComponent: React.FunctionComponent<IProps> = ({imageUri, width = Dimensions.get('window').width}) => {
    const [ratio, setRatio] = useState(1)
    const {uri, local} = imageUri
    const reCalcRatio = ({width, height}: { width: number, height: number }) => {
        setRatio(height / width)
    }
    return <>
        {local ?
            <Image
                source={{uri}}
                style={{width, height: width * ratio}}
                onLoad={event => {
                    const {width, height} = event.nativeEvent.source
                    reCalcRatio({width, height})
                }}
            />
            :
            <FastImage
                style={{width, height: width * ratio}}
                source={{
                    uri: `${env.endPointUrl}/${uri}`,
                    priority: FastImage.priority.normal,
                }}
                onLoad={event => {
                    const {width, height} = event.nativeEvent
                    reCalcRatio({width, height})

                }}
            />
        }
    </>
}
export default AutoHeightImageComponent
