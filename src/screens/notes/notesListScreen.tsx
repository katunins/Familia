import {FlatList, Pressable, RefreshControl, Text, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import SeparatorComponent from "../../components/separator";
import TrashIcon from "../../ui/svg/trashIcon";
import EditIcon from "../../ui/svg/editIcon";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {INavigation, RootStackParamList} from "../../interfaces/navigation";
import {setModal} from "../../store/slice/modal.slice";
import {notesSelector, relativesSelector, userSelector} from "../../store/selectors";
import {INote} from "../../interfaces/store";
import {actionDeleteNote, actionLoadNotes} from "../../store/slice/notes.slice";
import NoteComponent from "../../components/note";
import globalStyles from "../../styles/styles";
import styles from "./styles";

interface IProps extends INavigation {
    searchText: string
    setSearchText: (searchText: string) => void
}

const NotesListScreen = ({navigation, searchText, setSearchText}: IProps) => {
    const selectNotes = useSelector(notesSelector)
    const selectUser = useSelector(userSelector)
    const selectRelatives = useSelector(relativesSelector)

    const filterList = (item: INote) => {
        if (searchText.length < 3 || searchText === '') return true
        if (item.title.toUpperCase().indexOf(searchText.toUpperCase()) >= 0) return true
        if (item.description.toUpperCase().indexOf(searchText.toUpperCase()) >= 0) return true
        return false
    }

    const dispatch = useDispatch()

    const editNote = (item: INote) => {
        // @ts-ignore
        navigation.navigate('NoteEditScreen', {note: item})
    }

    const addNewNote = () => {
        // @ts-ignore
        navigation.navigate('addNoteStack')
    }

    const onRefresh = () => {
        dispatch(actionLoadNotes())
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
        <FlatList
            data={selectNotes.filter(item => item.creator === selectUser._id && filterList(item))}
            listKey={`main`}
            refreshing={true}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={onRefresh}
                />
            }
            renderItem={({item, index}) =>
                <NoteComponent
                    item={item}
                    index={index}
                    selectRelatives={selectRelatives}
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
                    ]}
                />}
            ItemSeparatorComponent={SeparatorComponent}
            ListFooterComponent={
                <View style={styles.container}>
                    <Pressable
                        style={[globalStyles.strokeForm, globalStyles.marginTop, globalStyles.marginBottom]}
                        onPress={addNewNote}>
                        <Text>Добавить запись</Text>
                    </Pressable>
                </View>
            }
            keyExtractor={item => item._id}
        />
    );
};

export default NotesListScreen
