import React, {useState} from "react";
import moment from "moment";
import {TextInput, View} from "react-native";
import globalStyles from "../styles/styles";
import SwitchButtonComponent from "./switchButton";
import ButtonComponent from "./button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import EStyleSheet from "react-native-extended-stylesheet";

interface IProps {
    closeCallback: () => void,
    saveCallback: (date: string) => void
    initialDate: string
}

const NoteDateComponent: React.FunctionComponent<IProps> = ({closeCallback, saveCallback, initialDate}) => {

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [exactly, setExactly] = useState<boolean>(true)
    const [date, setDate] = useState<string>(initialDate.slice(0, 4))

    const hideDatePicker = () => {
        setShowDatePicker(false)
    }

    const handleDateConfirm = (selectedDate: Date) => {
        saveCallback(moment(selectedDate).format('YYYY-MM-DD'))
        hideDatePicker()
        closeCallback()
    }

    const resetDate = () => {
        saveCallback('')
        closeCallback()
    }

    const saveYear = () => {
        saveCallback(date)
        closeCallback()
    }

    return (
        <>
            <View style={globalStyles.marginBottom}>
                <SwitchButtonComponent callBack={() => setExactly(!exactly)}/>
            </View>
            {exactly ?
                <>
                    <ButtonComponent title={'Установить точную дату'} type={'invert'}
                                     callBack={() => setShowDatePicker(true)}/>
                    <ButtonComponent title={'Отменить'} callBack={closeCallback}/>
                </>
                :
                <>
                    <TextInput
                        value={date}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={setDate}
                        maxLength={4}
                        placeholder={'Введите год 1942'}
                        textAlign={'center'}
                        keyboardType={'numeric'}
                        style={[globalStyles.strokeForm]}
                        clearButtonMode="while-editing"
                        placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
                    />
                    {date === '' ? <ButtonComponent title={'Удалить дату'} callBack={resetDate}/> :
                        <ButtonComponent title={'Сохранить'} callBack={saveYear}/>}
                </>}

            <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                date={initialDate === '' ? new Date() : new Date(initialDate)}
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />
        </>
    )
}

export default NoteDateComponent
