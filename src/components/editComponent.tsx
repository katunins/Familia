import React from 'react';
import {Text, TextInput, View} from 'react-native';
import globalStyles from '../styles/styles';
import styles from './styles';

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
          autoCompleteType={'name'}
        />
      </View>
    ) : (
      <Text style={globalStyles.title}>{text}</Text>
    );
  };

export default EditPersonalTextComponent;
