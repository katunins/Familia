import React from "react";
import {INavigation} from "../../interfaces/navigation";
import NoteImageComponent from "../../components/noteImage";
import {FlatList, Text, TextInput, View} from "react-native";
import styles from "./styles";
import ButtonComponent from "../../components/button";
import globalStyles from "../../styles/styles";
import {INote} from "../../interfaces/store";
import {useSelector} from "react-redux";
import {relativesSelector} from "../../store/selectors";
import NoteDataBlockComponent from "../../components/noteDataBlock";

const NoteDetailScreen: React.FunctionComponent<INavigation> = ({route, navigation}) => {
    const {note}: { note: INote } = route.params
    const selectRelatives = useSelector(relativesSelector)
    navigation.setOptions({title: note.title})

    const editNote = () => {
        navigation.navigate('NoteEditScreen', {note: note})
    }

    const goBack = () => {
        navigation.goBack()
    }
    return (
        <>
            <FlatList
                data={note.images}
                renderItem={(({item, index}) => <NoteImageComponent
                    uri={item}
                    key={index}/>)}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
                ListFooterComponent={
                    <View style={styles.container}>
                        <NoteDataBlockComponent note={note} selectRelatives={selectRelatives}/>
                        <View style={globalStyles.marginLine}>
                            <ButtonComponent title={'Редактировать'} callBack={editNote} type={'invert'}/>
                            <ButtonComponent title={'Назад'} callBack={goBack}/>
                        </View>
                    </View>
                }
            />
        </>
    )
}

export default NoteDetailScreen
