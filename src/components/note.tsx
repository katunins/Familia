import {INote, IRelative} from "../interfaces/store";
import React, {Fragment} from "react";
import ImageAndCountComponent from "./imageAndCount";
import NoteDataBlockComponent from "./noteDataBlock";
import {setModal} from "../store/slice/modal.slice";
import {actionDeleteNote} from "../store/slice/notes.slice";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/core";
import {ISetShowNoteMenu, IShowNoteMenu} from "../screens/notes/notesListScreen";
import {Pressable} from "react-native";

interface IProps {
    item: INote,
    selectRelatives: IRelative[]
    showNoteMenu: IShowNoteMenu
    setShowNoteMenu: ISetShowNoteMenu
}


const NoteComponent: React.FunctionComponent<IProps> =
    ({
         item,
         selectRelatives,
         setShowNoteMenu,
         showNoteMenu
     }) => {

        const dispatch = useDispatch()
        const navigation = useNavigation()

        const {images} = item

        const openDetail = images.length > 1 ? () => {
            console.log('11')
            navigation.navigate('NoteDetailScreen', {note: item})
        } : undefined

        const editNote = (item: INote) => {
            navigation.navigate('NoteEditScreen', {note: item})
        }
        const deleteNote = (note: INote) => {
            dispatch(setModal({

                title: 'Внимание!',
                bodyText: 'Вы действительно хотите удалить запись?',
                buttons: [
                    {
                        title: 'Удалить',
                        callBack: () => {
                            dispatch(actionDeleteNote({note}))
                        },
                        type: 'invert'
                    },
                    {
                        title: 'Отменить',
                    },
                ]
            }))
        }

        return (
            <Fragment>
                {images.length > 0 && <ImageAndCountComponent uriArr={images} callBack={openDetail}/>}
                <NoteDataBlockComponent
                    note={item} selectRelatives={selectRelatives}
                    noteMenu={{editNote, deleteNote, setShowNoteMenu, showNoteMenu}}
                />
            </Fragment>
        );
    }

export default NoteComponent


