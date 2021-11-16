import React from "react";
import {IRelative, IRelativeTypes} from "../interfaces/store";
import {Pressable, Text, View} from "react-native";
import styles from "./styles";
import globalStyles from "../styles/styles";
import EditIcon from "../ui/svg/editIcon";
import {defaultUserPic, relativeTypes} from "../config";
import TrashIcon from "../ui/svg/trashIcon";
import {actionDeleteRelative} from "../store/slice/relatives.slice";
import {useDispatch} from "react-redux";
import {resetModal, setModal} from "../store/slice/modal.slice";
import AutoHeightImageComponent from "./autoHeightImage";
import {stringDateParse} from "../helpers/utils";
import {INavigation} from "../interfaces/navigation";

interface IProps extends IRelativeTypes {
    item: IRelative,
    editButton: (data: IRelative) => void
    navigation: INavigation['navigation']
    hideButtons?: boolean
}

const RelativeBigComponent: React.FunctionComponent<IProps> = (
    {
        item,
        editButton,
        type,
        hideButtons=false,
        navigation
    }) => {
    const dispatch = useDispatch()
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
                    },
                },
                {
                    title: 'Отменить'
                },
            ],
        }))
    }

    const relativeDetail = () => {
        navigation.navigate('RelativeScreen', {relative: item})
    }
    return (
        <>
            <View style={[globalStyles.marginBottom]}>
                <Pressable onPress={relativeDetail}>
                    <AutoHeightImageComponent uri={item.userPic || defaultUserPic}/>
                </Pressable>
                {!hideButtons && <View style={styles.circleIconsContainer}>
                    <Pressable onPress={() => editButton(item)} style={styles.circleIconWrapper}><EditIcon/></Pressable>
                    <Pressable onPress={deleteButton} style={[styles.circleIconWrapper]}><TrashIcon/></Pressable>
                </View>}
            </View>

            <View style={[globalStyles.rowSpaceBetween, globalStyles.paddingWrapper]}>
                <View style={styles.leftBigComponentColumn}>
                    <Text style={globalStyles.title}>{item.name}</Text>
                    {item.about !== '' && <Text style={styles.aboutBigComponent}>{item.about}</Text>}
                </View>
                <View style={styles.rightBigComponentColumn}>
                    <Text>{stringDateParse(item.birthday)}</Text>
                    <Text style={styles.typeBigComponent}>{
                        relativeTypes[type]}</Text>
                </View>
            </View>
        </>
    )
}

export default RelativeBigComponent
