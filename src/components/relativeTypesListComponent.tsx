import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import globalStyles from '../styles/styles';
import styles from './styles';
import {relativeTypes} from '../config';
import {IRelativeTypes} from "../interfaces/store";

interface IProps {
  editDescription: string;
  type: string;
  setType: (data: IRelativeTypes["type"]) => void;
}

const RelativeTypesListComponent: React.FunctionComponent<IProps> = ({
  editDescription,
  type,
  setType,
}) => {
  const [showSelect, setShowSelect] = useState(false);
    return (
    <View style={styles.inputContainer}>
      <Text style={styles.editDescription}>{editDescription}</Text>
      <Pressable onPress={() => setShowSelect(!showSelect)}>
        <Text style={[globalStyles.textInput]}>
            {/*@ts-ignore*/}
          {relativeTypes[type]}
        </Text>
      </Pressable>
      <View style={styles.typesContainer}>
        {showSelect &&
          Object.keys(relativeTypes).map(key => (
            <Pressable
              onPress={() => {
                // @ts-ignore
                setType(key);
                setShowSelect(false);
              }}
              style={[
                styles.typesWrapper,
                key === type ? styles.selectedType : {},
              ]}
              key={key}>
                {/*@ts-ignore*/}
              <Text>{relativeTypes[key]}</Text>
            </Pressable>
          ))}
      </View>
    </View>
  );
};

export default RelativeTypesListComponent;
