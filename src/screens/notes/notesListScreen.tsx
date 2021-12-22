import {FlatList, Pressable, RefreshControl, Text, View} from "react-native";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {notesSelector, relativesSelector} from "../../store/selectors";
import {actionLoadNotes} from "../../store/slice/notes.slice";
import NoteComponent from "../../components/note";
import globalStyles from "../../styles/styles";
import styles from "./styles";
import {RouteProp, useFocusEffect, useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/declare.navigation";
import ButtonComponent from "../../components/button";

const NotesListScreen = () => {

    const isFocused = useIsFocused()

    const selectNotes = useSelector(notesSelector)
    const selectRelatives = useSelector(relativesSelector)
    const navigation = useNavigation()
    const route = useRoute<RouteProp<RootStackParamList, 'NotesListScreen'>>()
    const dispatch = useDispatch()

    const addNewNote = () => {
        navigation.navigate('addNoteStack')
    }

    const onRefresh = () => {
        dispatch(actionLoadNotes())
    }

    // загрузка родственников при переходе на экран
    // если noUpdateList, то не будет автоподргузки списка с сервера
    useEffect(() => {
        if (route.params?.noUpdateList) return
        onRefresh()
    }, [isFocused])

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
                    <ButtonComponent
                        title={'Добавить запись'} callBack={addNewNote} type={'invert'}/>
                </View>
            }
            keyExtractor={item => item._id}
        />
    );
};

export default NotesListScreen
