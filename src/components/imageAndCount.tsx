import React from "react";
import {Dimensions, Image, Pressable, Text, View} from "react-native";
import styles from "./styles";
import EditIcon from "../ui/svg/editIcon";
import TrashIcon from "../ui/svg/trashIcon";

interface IProps {
    width?: number,
    images: string[]
}

const ImageAndCountComponent: React.FunctionComponent<IProps> = ({images,width = Dimensions.get('window').width}) => {
    return (
        <View>
            <Image source={{uri: images[0]}} style={styles.imageAndCountImage} height={width}
                   resizeMode={'cover'}/>
            {images.length > 1 &&
            <Text style={styles.imageAndCountLabel}>{`+ ${images.length - 1}`}</Text>}
        </View>
    )
}
export default ImageAndCountComponent
