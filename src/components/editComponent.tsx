import React from 'react';
import {Text, TextInput, View} from 'react-native';
import globalStyles from '../styles/styles';
import styles from './styles';
import EStyleSheet from "react-native-extended-stylesheet";

interface IEditPersonalComponent {
  text: string;
  setText: (text: string) => void;
  editMode: boolean;
  editDescription: string;
}

const EditPersonalTextComponent: React.FunctionComponent<IEditPersonalComponent> =
  ({text, setText, editMode, editDescription}) => {
    return editMode ? (
      <View style={styles.inputContainer}>
        <Text style={styles.editDescription}>{editDescription}</Text>
        <TextInput
          style={globalStyles.textInput}
          value={text}
          onChangeText={setText}
          placeholder={'Имя'}
          placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
          autoCompleteType={'name'}
        />
      </View>
    ) : (
      <Text style={globalStyles.title}>{text}</Text>
    );
  };

export default EditPersonalTextComponent;
