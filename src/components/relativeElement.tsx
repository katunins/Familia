import React from 'react';
import {View, Text, Pressable} from 'react-native';
import TrashIcon from '../ui/svg/trashIcon';
import styles from './styles';
import globalStyles from '../styles/styles';
import FastImage from 'react-native-fast-image';
import {relativeTypes, squareAvatarSize} from '../helpers/utils';
import {useDispatch} from 'react-redux';
import {actionToDeleteRelative} from '../store/slice/relatives.slice';
import {resetModal, setModal} from '../store/slice/modal.slice';
import {put} from "redux-saga/effects";

interface IRelativeElement {
    id: string;
    name: string;
    userPic?: string;
    type: string;
    editMode: boolean;
}

const RelativeElement: React.FunctionComponent<IRelativeElement> =
    ({
         id,
         name,
         userPic,
         type,
         editMode,
     }) => {
        const dispatch = useDispatch();
        const eraseButton = () => {
            dispatch(setModal({
                title: 'Внимание!',
                bodyText: 'Удалить родственника?',
                buttons: [
                    {
                        title: 'Удалить',
                        type: 'invert',
                        callBack: () => {
                            dispatch(actionToDeleteRelative(id));
                            dispatch(resetModal());
                        },
                    },
                    {
                        title: 'Отменить',
                    },
                ],
            }))
        };

        const onPress = () => {
        };

        return (
            <Pressable
                onPress={editMode ? null : onPress}>
                <>
                    <View style={styles.avatarWrapper}>
                        <FastImage
                            style={{
                                width: squareAvatarSize,
                                height: squareAvatarSize,
                                borderRadius: 5
                            }}
                            source={{
                                uri: userPic,
                                headers: {Authorization: 'someAuthToken'},
                                priority: FastImage.priority.normal,
                            }}
                        />
                        <View style={styles.avatarDescriptionWrapper}>
                            <Text style={styles.relativeName}>{name}</Text>

                            <Text // @ts-ignore
                                style={styles.parentType}>{relativeTypes[type]}</Text>
                        </View>
                        {editMode && (<Pressable style={styles.eraseButton} onPress={eraseButton}>
                            <TrashIcon/>
                        </Pressable>)}
                    </View>
                </>
            </Pressable>
        );
    };

export default RelativeElement;
