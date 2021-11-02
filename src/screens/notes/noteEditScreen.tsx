import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../interfaces/navigation";
import {FlatList, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import ButtonComponent from "../../components/button";
import CameraIcon from "../../ui/svg/cameraIcon";
import GalleryIcon from "../../ui/svg/galeryIcon";
import ImagePicker, {Image} from "react-native-image-crop-picker";
import styles from "./styles";
import SeparatorComponent from "../../components/separator";
import globalStyles from "../../styles/styles";
import {useDispatch, useSelector} from "react-redux";
import RelativeCheckListElementComponent from "../../components/relativeCheckListElement";
import {relativesSelector, userSelector} from "../../store/selectors";
import {IImageUri, INote} from "../../interfaces/store";
import {imagePickerDefaultOptions, initialNote} from "../../config";
import NoteImageComponent from "../../components/noteImage";
import {getRelativeType} from "../../helpers/utils";
import ImageLoader from "../../helpers/imageLoader";
import {actionUpdateNote} from "../../store/slice/notes.slice";

type IProps = NativeStackScreenProps<RootStackParamList, 'NoteEditScreen'>
const NoteEditScreen: React.FunctionComponent<IProps> = ({route, navigation}) => {

    const selectRelatives = useSelector(relativesSelector)
    const user = useSelector(userSelector)
    const dispatch = useDispatch()
    const [note, setNote] = useState<INote>(route.params.note)
    const [newImages, setNewImages] = useState<Image[]>([])
    const [deleteImages, setDeleteImages] = useState<string[]>([])

    const {loadImages, loadCamera} = ImageLoader({newImages, setNewImages})

    const isChecked = (id: string) => note.relatives.find(item => item === id) ? true : false
    const switchCheck = (id: string) => {
        if (isChecked(id)) {
            setNote({...note, relatives: note.relatives.filter(item => item !== id)})
        } else {
            setNote({...note, relatives: [...note.relatives, id]})
        }
    }

    const cancel = () => {
        setNote({...note, ...initialNote})
        navigation.goBack()
        setNewImages([])
        setDeleteImages([])
    }

    const disableSaveButton = (newImages.length + deleteImages.length) === 0 && JSON.stringify(note) === JSON.stringify(route.params.note)
    const save = () => {
        dispatch(actionUpdateNote({
            note,
            newImages,
            deleteImages,
            callback: () => {
                setNote({...note, ...initialNote})
                setDeleteImages([])
                navigation.goBack()
            }
        }))
    }

    const deleteImage = ({uri, local}: IImageUri) => {
        if (local) {
            setNewImages(newImages.filter(item => item.path !== uri))
        } else {
            setDeleteImages([...deleteImages, uri])
            setNote({...note, images: note.images.filter(item => item !== uri)})
        }
    }
    const newImagesStack = newImages.map(item => {
        return {uri: item.path, local: true}
    })
    const noteImagesStack = note.images.map(item => {
        return {uri: item}
    })
    return (
        <View>
            <FlatList
                data={[...newImagesStack, ...noteImagesStack]}
                renderItem={(({item, index}) => <NoteImageComponent
                    eraseCallback={() => deleteImage(item)}
                    imageUri={item} key={index}/>)}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
                ListFooterComponent={
                    <View style={styles.container}>
                        <Text style={styles.centerTitleText}>Добавьте фотографии</Text>
                        <ButtonComponent title={'Камера'} callBack={loadCamera} icon={<CameraIcon/>}/>
                        <ButtonComponent title={'Галерея'} callBack={loadImages} icon={<GalleryIcon/>}/>
                        <View style={globalStyles.marginLine}/>
                        <SeparatorComponent/>
                        <Text style={styles.centerTitleText}>Измените описание</Text>
                        <TextInput
                            value={note.title}
                            autoCorrect={false}
                            onChangeText={title => setNote({...note, title: title})}
                            placeholder={'Первая квартира наших родителей'}
                            style={[globalStyles.strokeForm, globalStyles.buttonMargin]}
                        />
                        <TextInput
                            value={note.description}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            onChangeText={description => setNote({...note, description: description})}
                            placeholder={'Первая квартира наших родителей'}
                            multiline={true}
                            style={[globalStyles.strokeForm, globalStyles.textAreaForm, globalStyles.buttonMargin, styles.paddingTextArea]}
                        />
                        <Text style={styles.centerTitleText}>Отметьте родственников</Text>
                        <FlatList
                            style={styles.flatListWrapper}
                            data={selectRelatives}
                            renderItem={({item}) =>
                                <RelativeCheckListElementComponent
                                    item={item}
                                    checked={isChecked(item._id)}
                                    callBack={() => {
                                        switchCheck(item._id)
                                    }}
                                    type={getRelativeType({user, relative: item})}
                                />}
                            ItemSeparatorComponent={() => <SeparatorComponent/>}
                        />
                        <View style={globalStyles.marginLine}>
                            <ButtonComponent title={'Сохранить'} callBack={save} type={'invert'}
                                             disabled={disableSaveButton}/>
                            <ButtonComponent title={'Отменить'} callBack={cancel}/>
                        </View>
                    </View>
                }
            />


        </View>
    )
}
export default NoteEditScreen
