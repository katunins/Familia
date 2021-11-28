import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';
import EStyleSheet from "react-native-extended-stylesheet";
import globalStyles from "../styles/styles";

interface ICloudContainer {
  text: string;
  editMode: boolean;
  setAbout: (text: string) => void;
  editDescription: string;
}

const CloudContainer: React.FunctionComponent<ICloudContainer> = ({
  text,
  editMode,
  setAbout,
  editDescription,
}) => {
  const [showMore, setShowMore] = useState(true);

  return (
    <View style={globalStyles.paddingContainer}>
      {editMode ? (
          <>
            <Text style={styles.editDescription}>{editDescription}</Text>
            <TextInput style={[globalStyles.textInput, {height: 100}]}
                       value={text}
                       multiline={true}
                       numberOfLines={5}
                       onChangeText={setAbout}
                       placeholder={'Расскажите подробнее ...'}
                       placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
            />
          </>
      ) : (
        <>
          <Text style={styles.cloudText} numberOfLines={showMore ? 4 : 0} ellipsizeMode={'tail'}>
            {text}
          </Text>
          {/*<Text style={styles.showMore} onPress={() => setShowMore(!showMore)}>*/}
          {/*  {showMore ? 'Развернуть' : 'Скрыть'}*/}
          {/*</Text>*/}
        </>
      )}
    </View>
  );
};

export default CloudContainer;
