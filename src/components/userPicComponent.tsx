import React from "react";
import {Pressable} from "react-native";
import styles from "./styles";
import CameraIcon from "../ui/svg/cameraIcon";
import AutoHeightImageComponent, {IAutoHeightImageComponent} from "./autoHeightImage";

interface IProps extends IAutoHeightImageComponent {
    editMode: boolean,
    imageChangeButton: () => void
}

const UserPicComponent: React.FunctionComponent<IProps> =
    ({
         uri,
         editMode,
         imageChangeButton,
     }) => {
        return (
            <>
                <AutoHeightImageComponent uri={uri}/>
                {editMode && (
                    <Pressable
                        style={[styles.iconWrapper, styles.cameraIconWrapper]}
                        onPress={imageChangeButton}>
                        {CameraIcon()}
                    </Pressable>
                )}
            </>
        );
    };

export default UserPicComponent
