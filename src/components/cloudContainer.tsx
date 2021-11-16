import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';
import EStyleSheet from "react-native-extended-stylesheet";

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
    <View style={styles.cloudContainer}>
      {editMode ? (
          <>
            <Text style={styles.editDescription}>{editDescription}</Text>
            <TextInput style={styles.cloudText}
                       value={text}
                       multiline={true}
                       onChangeText={setAbout}
                       placeholder={'Интересные истории из жизни человка ...'}
                       placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
            />
          </>
      ) : (
        <>
          <Text style={styles.cloudText} numberOfLines={showMore ? 4 : 0} ellipsizeMode={'tail'}>
            {text}
          </Text>
          <Text style={styles.showMore} onPress={() => setShowMore(!showMore)}>
            {showMore ? 'Развернуть' : 'Скрыть'}
          </Text>
        </>
      )}
    </View>
  );
};

export default CloudContainer;
