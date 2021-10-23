import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';
import globalStyles from '../styles/styles';
import CalendarIcon from '../ui/svg/calendarIcon';

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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    if (!editMode) return;
    setDatePickerVisibility(true);
  };

  const handleDateConfirm = (date: Date) => {
    const stringDate: string = date.toISOString().substring(0, 10);
    setDate(stringDate);
    hideDatePicker();
  };
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
          {date ? new Date(date).toLocaleDateString() : ''}
        </Text>

        {editMode && <CalendarIcon />}
      </Pressable>
    </View>
  );
};

export default CalendarComponent;
