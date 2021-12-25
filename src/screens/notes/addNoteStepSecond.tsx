import React from "react";
import globalStyles from "../../styles/styles";
import {View} from "react-native";
import ButtonComponent from "../../components/button";
import {IServerNote} from "../../interfaces/store";
import {Image} from "react-native-image-crop-picker";
import {useDispatch, useSelector} from "react-redux";
import ImageAndCountComponent from "../../components/imageAndCount";
import NoteEditRelativesComponent from "../../components/noteEditRelatives";
import {relativesSelector, userSelector} from "../../store/selectors";
import {actionAddNote} from "../../store/slice/notes.slice";
import {useNavigation} from "@react-navigation/native";
import {getRelativeType} from "../tree/treeParser";

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
            navigation.navigate('NotesListScreen', {noUpdateList: true})
            dispatch(actionAddNote({
                note: {...note, creator: user._id},
                newImages: newImages,
                callback: reset,
            }))
        }
        const relativesWithTypes = relatives.map(item => {
            const type = getRelativeType({user, item, unionArr: [...relatives, user]})
            return {...item, type}
        })
        return (
            <NoteEditRelativesComponent
                note={note} setNote={setNote} relativesWithTypes={relativesWithTypes}
                ListHeaderComponent={
                    <View style={globalStyles.containerColor}>
                        <ImageAndCountComponent
                            uriArr={[...note.images, ...newImages.map(item => item.path)]}/>

                    </View>}
                ListFooterComponent={
                    <View style={globalStyles.marginLine}>
                        <ButtonComponent
                            title={'Сохранить'} callBack={save} type={'invert'}/>
                        <ButtonComponent title={'Назад'} callBack={() => {
                            navigation.goBack()
                        }}/>
                    </View>}
            />

        )
    }

export default AddNoteStepSecondScreen
