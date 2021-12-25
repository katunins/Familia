import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';
import globalStyles from '../styles/styles';
import CalendarIcon from '../ui/svg/calendarIcon';
import {resetModal, setModal} from "../store/slice/modal.slice";
import NoteDateComponent from "./noteDate";
import {useDispatch} from "react-redux";
import {stringDateParse} from "../helpers/utils";

interface ICalendarComponent {
  editMode: boolean;
  date: string;
  setDate: (stringDate: string) => void;
  editDescription: string;
}

const CalendarComponent: React.FunctionComponent<ICalendarComponent> = ({
  editMode,
  date,
  setDate,
  editDescription,
}) => {

  const dispatch = useDispatch()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    if (!editMode) return
    dispatch(setModal({
      title: 'Выбор даты',
      bodyText: 'Укажите точную дату или только год',
      component: <NoteDateComponent
          initialDate={date}
          saveCallback={(newDate) => setDate(newDate)}
          closeCallback={() => dispatch(resetModal())}/>
    }))
  };

  const handleDateConfirm = (date: Date) => {
    const stringDate: string = date.toISOString().substring(0, 10);
    setDate(stringDate);
    hideDatePicker();
  };
  if (!date) return null
  return (
    <View style={styles.inputContainer}>
      {editMode && (
        <Text style={styles.editDescription}>{editDescription}</Text>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date ? new Date(date) : new Date()}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <Pressable
        onPress={showDatePicker}
        style={
          editMode ? [globalStyles.strokeForm, globalStyles.spaceBetween] : {}
        }>
        <Text style={editMode ? {} : styles.dateText}>
          {stringDateParse(date)}
        </Text>

        {editMode && <CalendarIcon />}
      </Pressable>
    </View>
  );
};

export default CalendarComponent;
