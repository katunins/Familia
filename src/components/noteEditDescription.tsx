import styles from "../screens/notes/styles";
import {Text, TextInput, View} from "react-native";
import ButtonComponent from "./button";
import globalStyles from "../styles/styles";
import {stringDateParse} from "../helpers/utils";
import CalendarIcon from "../ui/svg/calendarIcon";
import React from "react";
import {INote, IServerNote} from "../interfaces/store";
import {resetModal, setModal} from "../store/slice/modal.slice";
import NoteDateComponent from "./noteDate";
import {useDispatch} from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";

interface IProps {
    note: INote | IServerNote,
    setNote: (note: INote | IServerNote) => void
}

const NoteEditDescriptionComponent: React.FunctionComponent<IProps> = ({note, setNote}) => {

    const dispatch = useDispatch()

    const dateButton = () => {
        dispatch(setModal({
            title: 'Дата события',
            bodyText: 'Укажите точную дату или только год',
            component: <NoteDateComponent
                initialDate={note.date}
                saveCallback={(newDate) => setNote({...note, date: newDate})}
                closeCallback={() => dispatch(resetModal())}/>
        }))
    }

    return (
        <>
            {/*<Text style={styles.centerTitleText}>История</Text>*/}
            <TextInput
                value={note.title}
                autoCorrect={false}
                onChangeText={title => setNote({...note, title: title})}
                placeholder={'Название'}
                placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
                style={[globalStyles.strokeForm, globalStyles.buttonMargin]}
            />
            <TextInput
                value={note.description}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={description => setNote({...note, description: description})}
                placeholder={'Опишите подробнее фотографии'}
                placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
                multiline={true}
                style={[globalStyles.strokeForm, globalStyles.textAreaForm, globalStyles.buttonMargin, styles.paddingTextArea]}
            />
            {/*<Text style={styles.centerTitleText}>Усдановите дату</Text>*/}
            <View style={globalStyles.marginBottom}>
                <ButtonComponent
                    title={note.date === '' ? 'Дата события' : stringDateParse(note.date)}
                    icon={CalendarIcon()}
                    callBack={dateButton}/>
            </View>
        </>
    )
}

export default NoteEditDescriptionComponent
