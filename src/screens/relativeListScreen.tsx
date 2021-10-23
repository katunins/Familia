import React, {useState} from "react";
import {View, Text, Pressable, FlatList} from 'react-native';
import {useSelector} from "react-redux";
import userSelector, {relativesSelector} from "../store/selectors";
import globalStyles from "../styles/styles";
import RelativeBigComponent from "../components/relativeBigComponent";
import SeparatorComponent from "../components/separator";
import {InitialRelativeObj} from "../helpers/utils";
import {IRelative, IRelativeIndex, IRelativeTypes} from "../interfaces/store";
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../interfaces/navigation";

/**
 * Экран со списком родственников
 * @param navigation
 * @constructor
 */
type IProps = NativeStackScreenProps<RootStackParamList, 'RelativeListScreen'>
const RelativeListScreen: React.FunctionComponent<IProps> = ({navigation}) => {

    const selectRelative = useSelector(relativesSelector);
    const selectUser = useSelector(userSelector);

    const addNewRelative = () => {
        // @ts-ignore
        navigation.navigate('RelativeFormScreen', {
            relativeData: InitialRelativeObj,
        })
    }

    const editRelative = (item: IRelative) => {
        // @ts-ignore
        navigation.navigate('RelativeFormScreen', {relativeData: item});
    }

    let relativesArr: IRelative[] = [];
    selectRelative.map(item => {
        const result: IRelativeIndex[] = selectUser.relatives.filter(el => el.id === item.id);
        if (result.length > 0) {
            // @ts-ignore
            relativesArr.push({...item, type: result[0].type});
        }
    });
    return (
        <View style={globalStyles.paddingWrapper}>
            <FlatList data={relativesArr}
                      renderItem={({item}) => <RelativeBigComponent item={item} editButton={editRelative}/>}
                      ItemSeparatorComponent={SeparatorComponent}
                      showsVerticalScrollIndicator={false}
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
