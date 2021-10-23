import React from "react";
import {Dimensions, Pressable} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import styles from "./styles";
import DeleteIcon from "../ui/svg/deleteIcon";

interface IProps {
    eraseCallback: (data: string) => void
    uri: string
}

const PostImageComponent: React.FunctionComponent<IProps> = ({uri, eraseCallback}) => {
    return (
        <>
            <AutoHeightImage source={{uri: uri}} width={Dimensions.get('window').width}/>
            <Pressable onPress={() => eraseCallback(uri)} style={styles.eraseImageButton}>
                <DeleteIcon/>
            </Pressable>
        </>
    )
}

export default PostImageComponent
