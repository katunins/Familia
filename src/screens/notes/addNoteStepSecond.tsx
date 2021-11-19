import React from "react";
import globalStyles from "../../styles/styles";
import {ScrollView, View} from "react-native";
import styles from "./styles";
import ButtonComponent from "../../components/button";
import CameraIcon from "../../ui/svg/cameraIcon";
import {IServerNote} from "../../interfaces/store";
import {Image} from "react-native-image-crop-picker";
import {INavigation} from "../../interfaces/navigation";
import {setModal} from "../../store/slice/modal.slice";
import GalleryIcon from "../../ui/svg/galeryIcon";
import ImageLoader from "../../helpers/imageLoader";
import {useDispatch, useSelector} from "react-redux";
import ImageAndCountComponent from "../../components/imageAndCount";
import NoteEditRelativesComponent from "../../components/noteEditRelatives";
import {relativesSelector, userSelector} from "../../store/selectors";
import {actionAddNote} from "../../store/slice/notes.slice";

interface IProps extends INavigation {
    note: IServerNote
    setNote: (note: IServerNote) => void
    newImages: Image[]
    setNewImages: (newImages: Image[]) => void
    reset: () => void
}

const AddNoteStepSecondScreen: React.FunctionComponent<IProps> =
    ({
         note,
         setNote,
         newImages,
         navigation,
         reset
     }) => {

        const relatives = useSelector(relativesSelector)
        const user = useSelector(userSelector)
        const dispatch = useDispatch()

        const save = () => {
            // @ts-ignore
            navigation.popToTop()
            // @ts-ignore
            navigation.navigate('notesListStack', {screen: 'NotesListScreen'})
            dispatch(actionAddNote({
                note: {...note, creator: user._id},
                newImages: newImages,
                callback: reset,
            }))
        }

        return (
            <ScrollView style={globalStyles.containerColor}>
                <ImageAndCountComponent uriArr={[...note.images, ...newImages.map(item => item.path)]}/>
                <View style={styles.container}>
                    <NoteEditRelativesComponent note={note} setNote={setNote} relatives={relatives} user={user}/>
                    <View style={globalStyles.marginLine}>
                        <ButtonComponent
                            title={'Сохранить'} callBack={save} type={'invert'}/>
                        <ButtonComponent title={'Назад'} callBack={() => {
                            navigation.goBack()
                        }}/>
                    </View>
                </View>
            </ScrollView>
        )
    }

export default AddNoteStepSecondScreen
