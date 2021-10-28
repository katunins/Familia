import React from "react";
import {IRelative, IRelativeTypes} from "../interfaces/store";
import {Pressable, Text, View} from "react-native";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import globalStyles from "../styles/styles";
import EditIcon from "../ui/svg/editIcon";
import {defaultUserPic, relativeTypes} from "../config";
import TrashIcon from "../ui/svg/trashIcon";
import {actionToDeleteRelative} from "../store/slice/relatives.slice";
import {useDispatch} from "react-redux";
import {resetModal, setModal} from "../store/slice/modal.slice";

interface IProps extends IRelativeTypes{
    item: IRelative,
    editButton: (data: IRelative) => void
}

const RelativeBigComponent: React.FunctionComponent<IProps> = (
    {
        item,
        editButton,
        type
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
                        dispatch(actionToDeleteRelative(item._id));
                        dispatch(resetModal());
                    },
                },
                {
                    title: 'Отменить'
                },
            ],
        }))
    }
    return (
        <>
            <View style={[styles.userPicWrapper, globalStyles.marginBottom]}>
                <FastImage
                    style={{width: '100%', height: '100%'}}
                    source={{
                        uri: item.userPic || defaultUserPic,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.circleIconsContainer}>
                    <Pressable onPress={()=>editButton(item)} style={styles.circleIconWrapper}><EditIcon/></Pressable>
                    <Pressable onPress={deleteButton} style={[styles.circleIconWrapper]}><TrashIcon/></Pressable>
                </View>
            </View>

            <View style={globalStyles.rowSpaceBetween}>
                <View style={styles.leftBigComponentColumn}>
                    <Text style={globalStyles.title}>{item.name}</Text>
                    <Text style={styles.aboutBigComponent}>{item.about}</Text>
                </View>
                <View style={styles.rightBigComponentColumn}>
                    <Text>{item.birthday}</Text>
                    <Text style={styles.typeBigComponent}>{
                        relativeTypes[type]}</Text>
                </View>
            </View>
        </>
    )
}

export default RelativeBigComponent
