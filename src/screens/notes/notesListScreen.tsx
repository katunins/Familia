import {FlatList, Pressable, RefreshControl, Text, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {INavigation} from "../../interfaces/navigation";
import {notesSelector, relativesSelector, userSelector} from "../../store/selectors";
import {INote} from "../../interfaces/store";
import {actionLoadNotes} from "../../store/slice/notes.slice";
import NoteComponent from "../../components/note";
import globalStyles from "../../styles/styles";
import styles from "./styles";
import {useFocusEffect} from "@react-navigation/native";
import {actionLoadRelatives} from "../../store/slice/relatives.slice";

interface IProps {
    searchText: string
    setSearchText: (searchText: string) => void
    navigation: INavigation['navigation']
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

    const addNewNote = () => {
        // @ts-ignore
        navigation.navigate('addNoteStack')
    }

    const onRefresh = () => {
        dispatch(actionLoadNotes())
    }

    useFocusEffect(
        React.useCallback(() => {
            dispatch(actionLoadNotes());
            // return () => dispatch(showTabBarNavigation());
        }, [])
    );

    return (
        <FlatList
            style={globalStyles.containerColor}
            data={selectNotes.filter(item => item.creator === selectUser._id && filterList(item)).reverse()}
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
                    navigation={navigation}
                />}
            ItemSeparatorComponent={()=><View style={globalStyles.marginLine}/>}
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
