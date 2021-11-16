import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../interfaces/navigation";
import {View} from "react-native";
import React, {useState} from "react";
import ButtonComponent from "../../components/button";
import CameraIcon from "../../ui/svg/cameraIcon";
import GalleryIcon from "../../ui/svg/galeryIcon";
import {Image} from "react-native-image-crop-picker";
import styles from "./styles";
import globalStyles from "../../styles/styles";
import {useDispatch, useSelector} from "react-redux";
import {relativesSelector, userSelector} from "../../store/selectors";
import {INote} from "../../interfaces/store";
import {initialNote} from "../../config";
import NoteImageComponent from "../../components/noteImage";
import {isServerUri} from "../../helpers/utils";
import ImageLoader from "../../helpers/imageLoader";
import {actionAddNote, actionUpdateNote} from "../../store/slice/notes.slice";
import NoteEditDescriptionComponent from "../../components/noteEditDescription";
import NoteEditRelativesComponent from "../../components/noteEditRelatives";
import {setModal} from "../../store/slice/modal.slice";
import {KeyboardAwareFlatList} from "react-native-keyboard-aware-scroll-view";
import EmptyImageComponent from "../../components/emptyImage";

type IProps = NativeStackScreenProps<RootStackParamList, 'NoteEditScreen'>
const NoteEditScreen: React.FunctionComponent<IProps> = ({route, navigation}) => {

    const relatives = useSelector(relativesSelector)
    const user = useSelector(userSelector)

    const dispatch = useDispatch()

    const [note, setNote] = useState<INote>(route.params.note)
    const [newImages, setNewImages] = useState<Image[]>([])
    const [deleteImages, setDeleteImages] = useState<string[]>([])

    const save = () => {
        if (note.title.length === 0) {
            if (note.title === '') {
                dispatch(setModal({
                    title: 'Ошибка!',
                    bodyText: 'Заголовок не может быть пустым!',
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
        // if (note._id === '') {
        //     // @ts-ignore
        //     navigation.navigate('notesListStack', {screen: 'NotesListScreen'})
        //     let newNote = Object.assign(note, {creator: user._id})
        //     delete (newNote._id)
        //     dispatch(actionAddNote({
        //         note: newNote,
        //         newImages: newImages,
        //         deleteImages: deleteImages,
        //         callback: reset,
        //     }))
        //     return;
        // }

        navigation.popToTop()
        dispatch(actionUpdateNote({
            note,
            newImages,
            deleteImages,
            callback: reset
        }))
    }

    const {loadImages, loadCamera} = ImageLoader({setNewImage: (image: Image) => setNewImages([...newImages, image])})

    const reset = () => {
        setNote({...initialNote, _id: ''})
        setNewImages([])
        setDeleteImages([])
    }

    const deleteImage = (uri: string) => {
        if (isServerUri(uri)) {
            setDeleteImages([...deleteImages, uri])
            setNote({...note, images: note.images.filter(item => item !== uri)})
        } else {
            setNewImages(newImages.filter(item => item.path !== uri))
        }
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
                            title={'Добавить фотографии'} icon={CameraIcon(true)}
                            type={'invert'} callBack={addImageModal}/>
                    </View>
                    <NoteEditDescriptionComponent note={note} setNote={setNote}/>
                    <NoteEditRelativesComponent note={note} setNote={setNote} relatives={relatives} user={user}/>
                    <View style={globalStyles.marginLine}>
                        <ButtonComponent
                            title={'Сохранить'} callBack={save} type={'invert'}
                            disabled={
                                (newImages.length + deleteImages.length) === 0
                                && JSON.stringify(note) === JSON.stringify(route.params.note)
                            }/>
                        <ButtonComponent title={'Отменить'} callBack={() => {
                            reset()
                            navigation.popToTop()
                        }}/>
                    </View>
                </View>
            }
        />
    )
}
export default NoteEditScreen
