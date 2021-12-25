import React, {useEffect} from "react";
import {View, Text, Pressable, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {relativesSelector, userSelector} from "../../store/selectors";
import globalStyles from "../../styles/styles";
import {IRelative} from "../../interfaces/store";
import {initialRelative} from "../../config";
import {uriParse} from "../../helpers/utils";
import {actionLoadRelatives} from "../../store/slice/relatives.slice";
import {RouteProp, useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import styles from "./styles";
import ButtonComponent from "../../components/button";
import {RootStackParamList} from "../../navigation/declare.navigation";
import {getRelativeType} from "../tree/treeParser";

/**
 * Экран со списком родственников
 * @param navigation
 * @constructor
 */

const RelativeListScreen: React.FunctionComponent = () => {

    const isFocused = useIsFocused()
    const relatives = useSelector(relativesSelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const route = useRoute<RouteProp<RootStackParamList, 'RelativeListScreen'>>()
    const addNewRelative = () => {
        navigation.navigate('RelativeFormScreen',
            {relativeData: {...initialRelative, access: {...initialRelative.access, creatorId: user._id}}}
        )
    }

    const detailRelative = (item: IRelative) => {
        navigation.navigate('RelativeDetailScreen', {relativeData: item});
    }

    const onRefresh = () => {
        if (!isFocused) return
        dispatch(actionLoadRelatives())
    }

    // загрузка родственников при переходе на экран
    // если noUpdateList, то не будет автоподргузки списка с сервера
    useEffect(() => {
        if (route.params?.noUpdateList) return
        onRefresh()
    }, [isFocused])

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
                            <Text>{getRelativeType({user, item, unionArr: [...relatives, user]})}</Text>
                        </View>
                    </Pressable>}
                refreshing={true}
                ListEmptyComponent={<View style={styles.emptyComponent}><Text>Нет добавленных родственников</Text></View>}
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
