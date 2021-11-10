import React from "react";
import {View, Text, Pressable, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {relativesSelector, userSelector} from "../store/selectors";
import globalStyles from "../styles/styles";
import RelativeBigComponent from "../components/relativeBigComponent";
import SeparatorComponent from "../components/separator";
import {IRelative} from "../interfaces/store";
import {INavigation} from "../interfaces/navigation";
import {initialRelative} from "../config";
import {getRelativeType} from "../helpers/utils";
import {actionLoadRelatives} from "../store/slice/relatives.slice";

/**
 * Экран со списком родственников
 * @param navigation
 * @constructor
 */
const RelativeListScreen: React.FunctionComponent<INavigation> = ({navigation, route}) => {

    const selectRelatives = useSelector(relativesSelector);
    const selectUser = useSelector(userSelector);
    const dispatch = useDispatch()
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

    const onRefresh = () => {
        dispatch(actionLoadRelatives(selectUser.relatives))
    }
    return (
        <View>
            <FlatList
                data={selectRelatives}
                renderItem={({item}) =>
                    <RelativeBigComponent item={item}
                        type={getRelativeType({relative: item, user: selectUser})} editButton={editRelative}/>}
                refreshing={true}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                    />
                }
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
