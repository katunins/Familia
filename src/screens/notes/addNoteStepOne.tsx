import React from "react";
import globalStyles from "../../styles/styles";
import NoteImageComponent from "../../components/noteImage";
import {View} from "react-native";
import styles from "./styles";
import ButtonComponent from "../../components/button";
import CameraIcon from "../../ui/svg/cameraIcon";
import NoteEditDescriptionComponent from "../../components/noteEditDescription";
import {KeyboardAwareFlatList} from "react-native-keyboard-aware-scroll-view";
import {IServerNote} from "../../interfaces/store";
import {Image} from "react-native-image-crop-picker";
import {setModal} from "../../store/slice/modal.slice";
import GalleryIcon from "../../ui/svg/galeryIcon";
import ImageLoader from "../../helpers/imageLoader";
import {useDispatch} from "react-redux";
import EmptyImageComponent from "../../components/emptyImage";
import {useNavigation} from "@react-navigation/native";

interface IProps {
    note: IServerNote
    setNote: (note: IServerNote) => void
    newImages: Image[]
    setNewImages: (newImages: Image[]) => void
    reset: () => void
}

const AddNoteStepOneScreen: React.FunctionComponent<IProps> =
    ({
         note,
         setNote,
         newImages,
         setNewImages,
         reset
     }) => {

        const navigation = useNavigation()
        const {
            loadImages,
            loadCamera
        } = ImageLoader({setNewImage: (image: Image) => setNewImages([...newImages, image])})

        const dispatch = useDispatch()

        const deleteImage = (uri: string) => {
            setNewImages(newImages.filter(item => item.path !== uri))
        }

        const nextStep = () => {
            if (note.title.length === 0 && newImages.length === 0) {
                if (note.title === '') {
                    dispatch(setModal({
                        title: 'Внимание!',
                        bodyText: 'Необходимо заполнить заголовок или загрузить одну фотографию',
                        buttons: [{
                            title: 'Понятно',
                            callBack: () => {
                            }
                        }]
                    }))
                    return
                }
                return
            }
            navigation.navigate('AddNoteStepSecond')
        }

        const addImageModal = () => {
            dispatch(setModal({
                title: 'Добавление фотографий',
                buttons: [
                    {
                        title: 'Камера',
                        icon: CameraIcon(),
                        callBack: loadCamera
                    },
                    {
                        title: 'Галерея',
                        icon: GalleryIcon(),
                        callBack: loadImages
                    }
                ]
            }))
        }
        const imagesArr = [...note.images, ...newImages.map(item => item.path)]

        return (
            <KeyboardAwareFlatList
                style={globalStyles.containerColor}
                data={imagesArr}
                renderItem={(({item, index}) => <NoteImageComponent
                    eraseCallback={() => deleteImage(item)}
                    uri={item}
                    key={index}/>)}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
                ListHeaderComponent={imagesArr.length === 0 ? EmptyImageComponent : undefined}
                ListFooterComponent={
                    <View style={styles.container}>
                        <View style={[globalStyles.buttonMargin, globalStyles.marginLine]}>
                            <ButtonComponent
                                title={'Добавить фотографии'} icon={CameraIcon()}
                                callBack={addImageModal}/>
                        </View>
                        <NoteEditDescriptionComponent note={note} setNote={setNote}/>
                        <View style={globalStyles.marginLine}>
                            <ButtonComponent
                                title={'Далее'} callBack={nextStep} type={'invert'}/>
                            <ButtonComponent title={'Отменить'} callBack={reset}/>
                        </View>
                    </View>
                }
            />
        )
    }

export default AddNoteStepOneScreen
