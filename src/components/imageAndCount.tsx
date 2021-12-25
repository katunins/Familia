import React from "react";
import {Pressable, Text} from "react-native";
import styles from "./styles";
import AutoHeightImageComponent from "./autoHeightImage";
import EmptyImageComponent from "./emptyImage";

interface IProps {
    width?: number,
    callBack?: () => void
    uriArr: string[]
}

const ImageAndCountComponent: React.FunctionComponent<IProps> = ({uriArr, callBack}) => {
    return (
        <Pressable onPress={callBack}>
            {uriArr.length === 0 ? <EmptyImageComponent/> :
                <>
                    <AutoHeightImageComponent uri={uriArr[0]}/>
                    {uriArr.length > 1 && <Text style={styles.imageAndCountLabel}>{`+ ${uriArr.length - 1}`}</Text>}
                </>
            }
        </Pressable>
    )
}
export default ImageAndCountComponent
