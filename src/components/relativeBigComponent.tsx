import React from "react";
import {IRelative} from "../interfaces/store";
import {Pressable, Text, View} from "react-native";
import styles from "./styles";
import globalStyles from "../styles/styles";
import {defaultUserPic} from "../config";
import {actionDeleteRelative} from "../store/slice/relatives.slice";
import {useDispatch} from "react-redux";
import {resetModal, setModal} from "../store/slice/modal.slice";
import AutoHeightImageComponent from "./autoHeightImage";
import {stringDateParse} from "../helpers/utils";
import {useNavigation} from "@react-navigation/native";
import ButtonComponent from "./button";

interface IProps {
    item: IRelative,
    editButton: (data: IRelative) => void
    type: string | undefined
}

const RelativeBigComponent: React.FunctionComponent<IProps> = (
    {
        item,
        editButton,
        type,
    }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const deleteButton = () => {
        dispatch(setModal({
            title: 'Внимание!',
            bodyText: 'Удалить родственника?',
            buttons: [
                {
                    title: 'Удалить',
                    type: 'invert',
                    callBack: () => {
                        dispatch(actionDeleteRelative(item));
                        dispatch(resetModal());
                        navigation.goBack()
                    },
                },
                {
                    title: 'Отменить'
                },
            ],
        }))
    }

    const relativeDetail = () => {
        navigation.navigate('RelativeDetailScreen', {relativeData: item})
    }

    return (
        <>
            <View style={[globalStyles.marginBottom]}>
                <Pressable onPress={relativeDetail}>
                    <AutoHeightImageComponent uri={item.userPic || defaultUserPic}/>
                </Pressable>
            </View>

            <View style={[globalStyles.rowSpaceBetween, globalStyles.paddingWrapper]}>
                <View style={styles.leftBigComponentColumn}>
                    <Text style={globalStyles.title}>{item.name}</Text>
                    {item.about !== '' && <Text style={styles.aboutBigComponent}>{item.about}</Text>}
                </View>
                <View style={styles.rightBigComponentColumn}>
                    <Text>{stringDateParse(item.birthday)}</Text>
                    <Text style={styles.typeBigComponent}>{type}</Text>
                </View>
            </View>
            <View style={[globalStyles.paddingWrapper, globalStyles.marginLine]}>
                <ButtonComponent title={'Редактировать'} type={'invert'} callBack={() => editButton(item)}/>
                <ButtonComponent title={'Удалить'} callBack={deleteButton}/>
            </View>
        </>
    )
}

export default RelativeBigComponent
