import {View, FlatList} from "react-native";
import React from "react";
import ButtonComponent from "../../components/button";
import styles from "./styles";
import CameraIcon from "../../ui/svg/cameraIcon";
import GalleryIcon from "../../ui/svg/galeryIcon";
import globalStyles from "../../styles/styles";
import {INoteData} from "../../interfaces/store";
import {NavigationScreenProp} from "react-navigation";
import NoteImageComponent from "../../components/noteImage";
import {Image} from 'react-native-image-crop-picker'
import ImageLoader from "../../helpers/imageLoader";
import {isServerUri} from "../../helpers/utils";

export interface INoteImagesProps {
    newImages: Image[]
    setNewImages: (newImages: Image[]) => void;
    deleteImages: string[];
    setDeleteImages: (deleteImages: string[]) => void;
}

interface IProps {
    navigation: NavigationScreenProp<{}>
    note: INoteData,
    setNote: (note: INoteData) => void
    imagesProps: INoteImagesProps
}

const ImagesScreen = ({navigation, note, setNote, imagesProps}: IProps) => {

    const {newImages, setNewImages, deleteImages, setDeleteImages} = imagesProps
    const {loadImages, loadCamera} = ImageLoader({setNewImage: (image: Image) => setNewImages([...newImages, image])})

    const deleteImage = (uri: string) => {
            setNewImages(newImages.filter(item => item.path !== uri))
    }

    const nextStep = () => {
        navigation.navigate('NewNoteDescription')
    }

    return (
        <>
            <FlatList
                data={[...note.images, ...newImages.map(item => item.path)]}
                renderItem={({item, index}) => <NoteImageComponent
                    eraseCallback={() => deleteImage(item)}
                    uri={item}
                    key={index}/>}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
            />
            <View style={styles.container}>
                <View style={globalStyles.marginLine}>
                    <ButtonComponent title={'Камера'} callBack={loadCamera} icon={<CameraIcon/>}/>
                    <ButtonComponent title={'Галерея'} callBack={loadImages} icon={<GalleryIcon/>}/>
                    <ButtonComponent title={'Далее'} callBack={nextStep} type={'invert'}
                                     disabled={note.images.length + newImages.length === 0}/>
                </View>
            </View>
        </>

    );
};

export default ImagesScreen
