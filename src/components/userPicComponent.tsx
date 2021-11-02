import React, {useState} from "react";
import {Dimensions, Pressable, View} from "react-native";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import CameraIcon from "../ui/svg/cameraIcon";
import {containerWidth} from "../helpers/utils";
import AutoHeightImageComponent from "./autoHeightImage";
import {IImageUri} from "../interfaces/store";

interface IProps {
    imageUri:IImageUri
    editMode: boolean,
    imageChangeButton: () => void
}

const UserPicComponent: React.FunctionComponent<IProps> = ({imageUri, editMode, imageChangeButton}) => {
    return (
        <>
            <AutoHeightImageComponent imageUri={imageUri}/>
            {editMode && (
                <Pressable
                    style={[styles.iconWrapper, styles.cameraIconWrapper]}
                    onPress={imageChangeButton}>
                    <CameraIcon/>
                </Pressable>
            )}
        </>
    );
};

export default UserPicComponent
