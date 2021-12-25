import React, {useEffect, useState} from "react";
import globalStyles from "../styles/styles";
import {Dimensions, GestureResponderEvent, Pressable, Text, View} from "react-native";
import styles from "./styles";
import {INote, IRelative} from "../interfaces/store";
import RelativesBlockComponent from "./relativesBlock";
import {stringDateParse} from "../helpers/utils";
import DotsIcon from "../ui/svg/dots";
import NoteMenu from "./noteItem";
import {ISetShowNoteMenu, IShowNoteMenu} from "../screens/notes/notesListScreen";

interface IProps {
    note: INote
    selectRelatives: IRelative[],
    noteMenu? : {
        setShowNoteMenu: ISetShowNoteMenu
        showNoteMenu: IShowNoteMenu
        editNote: (item: INote) => void
        deleteNote: (item: INote) => void
    }
}

const NoteDataBlockComponent: React.FunctionComponent<IProps> = (
    {
        note,
        selectRelatives,
        noteMenu
    }) => {
    const {description, date, title, relatives} = note
    const dotsButton = (event: GestureResponderEvent) => {
        const {pageY} = event.nativeEvent
        if (noteMenu?.showNoteMenu !=='') noteMenu?.setShowNoteMenu(''); else
        if (pageY < Dimensions.get('window').height - 70) noteMenu?.setShowNoteMenu(note._id)
    }

    return (
        <View style={[globalStyles.paddingContainer]}>
            {noteMenu?.showNoteMenu === note._id && noteMenu &&
            <NoteMenu item={note} editNote={noteMenu.editNote}
                      deleteNote={noteMenu.deleteNote}/>}
            <View style={styles.noteComponentDotsWrapper}>
                <Text style={globalStyles.title}>{title}</Text>
                <Pressable onPress={dotsButton} hitSlop={16} style={styles.dotsMenuButton}>
                    <DotsIcon/>
                </Pressable>
            </View>
            {selectRelatives && description !== "" && <Text style={styles.noteComponentText}>{description}</Text>}
            {date !== '' && <Text style={styles.noteDate}>{stringDateParse(date)}</Text>}
            {selectRelatives && <RelativesBlockComponent relatives={relatives} selectRelatives={selectRelatives}/>}
        </View>
    )
}

export default NoteDataBlockComponent
