import React, { Component } from "react";
import { Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import * as url from "url";

// const { width } = Dimensions.get("window");
interface IProps {
    width:number,
    uri: string
}

class AutoHeightFastImageComponent extends Component<IProps, {calcImgHeight: number}> {
    constructor(props:IProps) {
        super(props);
        this.state = {
            calcImgHeight: 0,
        };
    }
    render() {
        const { calcImgHeight } = this.state;
        return (
            <FastImage
                style={{ width: this.props.width, height: calcImgHeight }}
                source={{
                    uri: this.props.uri,
                }}
                resizeMode={FastImage.resizeMode.contain}
                onLoad={evt =>
                    this.setState({
                        calcImgHeight:
                            evt.nativeEvent.height / evt.nativeEvent.width * this.props.width, // By this, you keep the image ratio
                    })}
            />
        );
    }
}

export default AutoHeightFastImageComponent

