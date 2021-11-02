import React from "react";
import {Pressable} from "react-native";
import styles from "./styles";
import DeleteIcon from "../ui/svg/deleteIcon";
import AutoHeightImageComponent from "./autoHeightImage";
import {IImageUri} from "../interfaces/store";

interface IProps {
    eraseCallback: (imageUri:IImageUri) => void
    imageUri:IImageUri
}

const NoteImageComponent: React.FunctionComponent<IProps> = ({imageUri, eraseCallback}) => {
     return (
        <>
            <AutoHeightImageComponent imageUri={imageUri}/>
            <Pressable onPress={() => eraseCallback(imageUri)} style={styles.eraseImageButton}>
                <DeleteIcon/>
            </Pressable>
        </>
    )
}

export default NoteImageComponent
