import React from "react";
import { Pressable, View} from "react-native";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import CameraIcon from "../ui/svg/cameraIcon";

interface IProps {
    userPic?: string,
    editMode:boolean,
    imageChangeButton: ()=>void
}

const UserPicComponent: React.FunctionComponent<IProps> = ({userPic, editMode, imageChangeButton}) => {
    return (
    <View style={styles.userPicWrapper}>
      <FastImage
        style={{width: '100%', height: '100%'}}
        source={{
          uri: userPic,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      {editMode && (
        <Pressable
          style={[styles.iconWrapper, styles.cameraIconWrapper]}
          onPress={imageChangeButton}>
          <CameraIcon />
        </Pressable>
      )}
    </View>
  );
};

export default UserPicComponent
