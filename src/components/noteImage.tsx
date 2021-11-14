import React from "react";
import {Pressable} from "react-native";
import styles from "./styles";
import DeleteIcon from "../ui/svg/deleteIcon";
import AutoHeightImageComponent from "./autoHeightImage";

interface IProps {
    eraseCallback?: (uri: string) => void
    uri: string
}

const NoteImageComponent: React.FunctionComponent<IProps> = ({uri, eraseCallback}) => {
    return (
        <>
            <AutoHeightImageComponent uri={uri}/>
            {eraseCallback && <Pressable onPress={() => eraseCallback(uri)} style={styles.eraseImageButton}>
                <DeleteIcon/>
            </Pressable>}
        </>
    )
}

export default NoteImageComponent
