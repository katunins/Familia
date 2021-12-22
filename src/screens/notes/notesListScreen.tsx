import {FlatList, Pressable, RefreshControl, Text, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {notesSelector, relativesSelector} from "../../store/selectors";
import {actionLoadNotes} from "../../store/slice/notes.slice";
import NoteComponent from "../../components/note";
import globalStyles from "../../styles/styles";
import styles from "./styles";
import {useFocusEffect, useNavigation} from "@react-navigation/native";

const NotesListScreen = () => {
    const selectNotes = useSelector(notesSelector)
    const selectRelatives = useSelector(relativesSelector)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const addNewNote = () => {
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
            data={[...selectNotes].reverse()}
            listKey={`main`}
            refreshing={true}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={onRefresh}
                />
            }
            renderItem={({item}) =>
                <NoteComponent
                    item={item}
                    selectRelatives={selectRelatives}
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
