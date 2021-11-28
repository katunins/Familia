import React from "react";
import {View, Text, Pressable, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {relativesSelector, userSelector} from "../../store/selectors";
import globalStyles from "../../styles/styles";
import RelativeBigComponent from "../../components/relativeBigComponent";
import {IRelative} from "../../interfaces/store";
import {RootStackParamList} from "../../interfaces/navigation";
import {initialRelative} from "../../config";
import {getRelativeType} from "../../helpers/utils";
import {actionLoadRelatives} from "../../store/slice/relatives.slice";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {useFocusEffect} from "@react-navigation/native";

/**
 * Экран со списком родственников
 * @param navigation
 * @constructor
 */
type IProps = NativeStackScreenProps<RootStackParamList, 'RelativeListScreen'>;

const RelativeListScreen: React.FunctionComponent<IProps> = ({navigation, route}) => {

    const selectRelatives = useSelector(relativesSelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch()
    const addNewRelative = () => {
        // @ts-ignore
        navigation.navigate('RelativeFormScreen', {
            relativeData: {...initialRelative, access: {...initialRelative.access, creatorId: user._id}}
        })
    }

    const editRelative = (item: IRelative) => {
        // @ts-ignore
        navigation.navigate('RelativeFormScreen', {relativeData: item});
    }

    const onRefresh = () => {
        dispatch(actionLoadRelatives())
    }



    useFocusEffect(
        React.useCallback(() => {
            dispatch(actionLoadRelatives());
            // return () => dispatch(showTabBarNavigation());
        }, [])
    );

    return (
        <View style={globalStyles.containerColor}>
            <FlatList
                data={selectRelatives}
                renderItem={({item}) =>
                    <RelativeBigComponent
                        item={item}
                        type={getRelativeType({relative: item, user: user})}
                    // @ts-ignore
                        editButton={editRelative} navigation={navigation}
                    />}
                refreshing={true}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                    />
                }
                ItemSeparatorComponent={()=><View style={globalStyles.marginLine}/>}
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
