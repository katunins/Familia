import React, {useCallback, useEffect} from "react";
import {View, Text, Pressable, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {relativesSelector, userSelector} from "../../store/selectors";
import globalStyles from "../../styles/styles";
import {IRelative} from "../../interfaces/store";
import {RootStackParamList} from "../../interfaces/navigation";
import {initialRelative} from "../../config";
import {getType, uriParse} from "../../helpers/utils";
import {actionLoadRelatives} from "../../store/slice/relatives.slice";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import styles from "./styles";
import ButtonComponent from "../../components/button";

/**
 * Экран со списком родственников
 * @param navigation
 * @constructor
 */
type IProps = NativeStackScreenProps<RootStackParamList, 'RelativeListScreen'>;

const RelativeListScreen: React.FunctionComponent<IProps> = ({route, navigation}) => {

    const isFocused = useIsFocused()
    const relatives = useSelector(relativesSelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch()
    const addNewRelative = () => {
        navigation.navigate('RelativeFormScreen',
            {
                // @ts-ignore
                relativeData: {...initialRelative, access: {...initialRelative.access, creatorId: user._id}}
            }
        )
    }

    const detailRelative = (item: IRelative) => {
        // @ts-ignore
        navigation.navigate('RelativeDetailScreen', {relativeData: item});
    }

    const onRefresh = () => {
        if (!isFocused) return
        dispatch(actionLoadRelatives())
    }

    // загрузка родственников при переходе на экран
    useEffect(onRefresh, [isFocused])

    return (
        <View style={globalStyles.containerColor}>
            <FlatList
                data={relatives}
                renderItem={({item}) =>
                    <Pressable style={[globalStyles.row, globalStyles.paddingWrapper, styles.itemContainer]}
                               onPress={() => detailRelative(item)}>
                        {/*@ts-ignore*/}
                        <FastImage style={styles.userPicWrapper}
                                   source={uriParse(item.userPic)} resizeMode={'cover'}/>
                        <View style={styles.nameWrapper}>
                            <Text style={styles.relativeName}>{item.name}</Text>
                            {item.birthday !== '' && <Text style={globalStyles.lightText}>{item.birthday}</Text>}
                            <Text>{getType({root: user, item, relatives: relatives})}</Text>
                        </View>
                    </Pressable>}
                refreshing={true}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
                ListFooterComponentStyle={globalStyles.paddingWrapper}
                ListFooterComponent={
                    <ButtonComponent title={'Добавить родственника'} type={'invert'} callBack={addNewRelative}/>
                }
            />
        </View>
    )
}

export default RelativeListScreen
