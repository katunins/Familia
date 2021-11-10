import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../interfaces/navigation";
import {FlatList, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import ButtonComponent from "../../components/button";
import CameraIcon from "../../ui/svg/cameraIcon";
import GalleryIcon from "../../ui/svg/galeryIcon";
import {Image} from "react-native-image-crop-picker";
import styles from "./styles";
import SeparatorComponent from "../../components/separator";
import globalStyles from "../../styles/styles";
import {useDispatch, useSelector} from "react-redux";
import RelativeCheckListElementComponent from "../../components/relativeCheckListElement";
import {relativesSelector, userSelector} from "../../store/selectors";
import {INote} from "../../interfaces/store";
import {initialNote} from "../../config";
import NoteImageComponent from "../../components/noteImage";
import {getRelativeType, isRelativeChecked, isServerUri} from "../../helpers/utils";
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
    const save = () => {
        navigation.popToTop()
        dispatch(actionUpdateNote({
            note,
            newImages,
            deleteImages,
            callback: reset
        }))
    }
    const {loadImages, loadCamera} = ImageLoader({setNewImage: (image: Image) => setNewImages([...newImages, image])})

    const switchCheck = (id: string) => {
        if (isRelativeChecked({id, relatives: note.relatives})) {
            setNote({...note, relatives: note.relatives.filter(item => item !== id)})
        } else {
            setNote({...note, relatives: [...note.relatives, id]})
        }
    }

    const reset = () => {
        setNote({...initialNote, _id:''})
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

    return (
        <View>
            <FlatList
                data={[...newImages.map(item => item.path), ...note.images]}
                renderItem={(({item, index}) => <NoteImageComponent
                    eraseCallback={() => deleteImage(item)}
                    uri={item}
                    key={index}/>)}
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
                                    checked={isRelativeChecked({id: item._id, relatives: note.relatives})}
                                    callBack={() => {
                                        switchCheck(item._id)
                                    }}
                                    type={getRelativeType({user, relative: item})}
                                />}
                            ItemSeparatorComponent={() => <SeparatorComponent/>}
                        />
                        <View style={globalStyles.marginLine}>
                            <ButtonComponent title={'Сохранить'} callBack={save} type={'invert'}
                                             disabled={(newImages.length + deleteImages.length) === 0 && JSON.stringify(note) === JSON.stringify(route.params.note)}/>
                            <ButtonComponent title={'Отменить'} callBack={()=> {
                                reset()
                                navigation.popToTop()
                            }}/>
                        </View>
                    </View>
                }
            />


        </View>
    )
}
export default NoteEditScreen
