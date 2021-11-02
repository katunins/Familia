import React from "react";
import {View, Text, Pressable, FlatList} from 'react-native';
import {useSelector} from "react-redux";
import {relativesSelector, userSelector} from "../store/selectors";
import globalStyles from "../styles/styles";
import RelativeBigComponent from "../components/relativeBigComponent";
import SeparatorComponent from "../components/separator";
import {IRelative, IRelativeIndex} from "../interfaces/store";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../interfaces/navigation";
import {initialRelative} from "../config";
import {getRelativeType} from "../helpers/utils";

/**
 * Экран со списком родственников
 * @param navigation
 * @constructor
 */
type IProps = NativeStackScreenProps<RootStackParamList, 'RelativeListScreen'>
const RelativeListScreen: React.FunctionComponent<IProps> = ({navigation}) => {

    const selectRelatives = useSelector(relativesSelector);
    const selectUser = useSelector(userSelector);

    const addNewRelative = () => {
        // @ts-ignore
        navigation.navigate('RelativeFormScreen', {
            relativeData: {...initialRelative, access: {...initialRelative.access, creatorId: selectUser._id}}
        })
    }

    const editRelative = (item: IRelative) => {
        // @ts-ignore
        navigation.navigate('RelativeFormScreen', {relativeData: item});
    }
    return (
        <View>
            <FlatList data={selectRelatives}
                      renderItem={({item}) => <RelativeBigComponent item={item} type={getRelativeType({
                          relative: item,
                          user: selectUser
                      })} editButton={editRelative}/>}
                      ItemSeparatorComponent={SeparatorComponent}
                      showsVerticalScrollIndicator={false}
                      ListFooterComponentStyle={globalStyles.paddingWrapper}
                      ListFooterComponent={
                          <Pressable
                              style={[globalStyles.strokeForm, globalStyles.marginTop, globalStyles.marginBottom]}
                              onPress={addNewRelative}>
                              <Text>Добавить родственника</Text>
                          </Pressable>
                      }
            />

        </View>
    )
}

export default RelativeListScreen
