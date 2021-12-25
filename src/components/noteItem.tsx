import {INote} from "../interfaces/store";
import {Pressable, Text, View} from "react-native";
import styles from "./styles";
import EditIcon from "../ui/svg/editIcon";
import SeparatorComponent from "./separator";
import TrashIcon from "../ui/svg/trashIcon";
import React from "react";

interface IProps {
    item: INote
    editNote: (item: INote) => void
    deleteNote: (item: INote) => void
}

const NoteMenu: React.FunctionComponent<IProps> = ({item, editNote, deleteNote}) => {
    return <View style={styles.dotsMenu}>
        <Pressable
            onPress={() => {
                editNote(item)
            }}
            hitSlop={32}
        >
            <View style={styles.noteComponentDotsLineWrapper}>
                <Text style={styles.noteComponentDotsLineText}>Изменить</Text>
                <EditIcon/>
            </View>
        </Pressable>
        <SeparatorComponent/>
        <Pressable
            onPress={() => {
                deleteNote(item)
            }}
            hitSlop={32}
        >
            <View style={styles.noteComponentDotsLineWrapper}>
                <Text style={styles.noteComponentDotsLineText}>Удалить</Text>
                <TrashIcon/>
            </View>
        </Pressable>
    </View>
}
export default NoteMenu
