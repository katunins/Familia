import React, {useState} from "react";
import FastImage from "react-native-fast-image";
import {ActivityIndicator, Dimensions} from "react-native";
import {uriParse} from "../helpers/utils";
import {createImageProgress} from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

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
        const Image = createImageProgress(FastImage);
        return (
            <Image
                source={uriParse(uri)}
                style={{width, height: width * ratio}}
                indicator={ProgressBar.Pie}
                onLoad={(event: { nativeEvent: { width: number, height: number } }) => {
                    const {width, height} = event.nativeEvent
                    setRatio(height / width)
                }}
            />
        )
    }
export default AutoHeightImageComponent
