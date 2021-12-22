import React from "react";
import globalStyles from "../../styles/styles";
import {ScrollView, View} from "react-native";
import styles from "./styles";
import ButtonComponent from "../../components/button";
import {IServerNote} from "../../interfaces/store";
import {Image} from "react-native-image-crop-picker";
import {useDispatch, useSelector} from "react-redux";
import ImageAndCountComponent from "../../components/imageAndCount";
import NoteEditRelativesComponent from "../../components/noteEditRelatives";
import {relativesSelector, userSelector} from "../../store/selectors";
import {actionAddNote} from "../../store/slice/notes.slice";
import {useNavigation} from "@react-navigation/native";

interface IProps {
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
         reset
     }) => {

        const relatives = useSelector(relativesSelector)
        const user = useSelector(userSelector)
        const dispatch = useDispatch()

        const navigation = useNavigation()

        const save = () => {
            // navigation.popToTop()
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
