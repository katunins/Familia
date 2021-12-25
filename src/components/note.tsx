import {INote, IRelative} from "../interfaces/store";
import React, {Fragment} from "react";
import ImageAndCountComponent from "./imageAndCount";
import NoteDataBlockComponent from "./noteDataBlock";
import EditIcon from "../ui/svg/editIcon";
import TrashIcon from "../ui/svg/trashIcon";
import {setModal} from "../store/slice/modal.slice";
import {actionDeleteNote} from "../store/slice/notes.slice";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";

interface IProps {
    item: INote,
    selectRelatives: IRelative[]
    mini?: boolean
}


const NoteComponent: React.FunctionComponent<IProps> =
    ({item, selectRelatives, mini = false}) => {

        const dispatch = useDispatch()
        const navigation = useNavigation()

        const {images} = item

        const openDetail = images.length > 1 ? () => {
            navigation.navigate('NoteDetailScreen', {note:item})
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
                    mini={mini}
                    dotsMenu={[
                        {
                            title: 'Изменить',
                            callBack: () => editNote(item),
                            icon: <EditIcon/>
                        },
                        {
                            title: 'Удалить',
                            callBack: () => deleteNote(item),
                            icon: <TrashIcon/>
                        }
                    ]}/>
            </Fragment>
        );
    }

export default NoteComponent
