import React, {useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TouchableWithoutFeedback, View} from 'react-native';
import globalStyles from '../styles/styles';
import EditPersonalComponent from './editComponent';
import CalendarComponent from './calendarComponent';
import CloudContainer from './cloudContainer';
import {IRelative, IRelativeTypes, IUser} from '../interfaces/store';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import UserPicComponent from './userPicComponent';
import {useDispatch} from 'react-redux';
import RelativeTypesListComponent from './relativeTypesListComponent';
import {useFocusEffect} from "@react-navigation/native";
import ButtonComponent from "./button";
import {ISaveRelativeCallback} from "../screens/relativeFormScreen";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {setModal} from "../store/slice/modal.slice";
import config, {defaultRelativeUserPic, defaultUserPic, imagePickerDefaultOptions} from "../config";
import ImageLoader from "../helpers/imageLoader";

interface IProps {
    initialRelative: IRelative;
    saveCallback: (data: ISaveRelativeCallback) => void;
    defaultEditMode: boolean
    cancelCallback: () => void
    relativeType: IRelativeTypes["type"]
}

/**
 *
 * @param initialUser - данные пользователя для редактирования
 * @param saveCallback - callBack кнопки сохранить
 * @param relativeType - тип родственника
 * @param userType - тип пользователя, которого редактируем или создаем
 * @param buttonLogOut - кнопка выхода из аккаунта
 * @param navigation - объект навигации
 * @param defaultEditMode - режим редактирвоания
 * @constructor
 */

const RelativeComponent: React.FunctionComponent<IProps> =
    ({
         initialRelative,
         saveCallback,
         relativeType,
         defaultEditMode = false,
         cancelCallback
     }) => {

        const [editMode, setEditMode] = useState(defaultEditMode);
        const [relative, setRelative] = useState(initialRelative);
        const [type, setType] = useState(relativeType);
        const [newImages, setNewImages] = useState<Image[]>([]);

        const dispatch = useDispatch();


        const saveButton = () => {
            if (!validate()) return false;
            if (JSON.stringify(initialRelative) === JSON.stringify(relative) && relativeType === type && newImages.length === 0) return false
            saveCallback({
                relativeData: relative,
                type,
                newImage: newImages[0],
                callBack: () => {
                    resetState()
                }
            });
        };

        const resetState = () => {
            setNewImages([])
            setEditMode(false)
        }


        const cancelButton = () => {
            resetState()
            setEditMode(false);
            if (cancelCallback) cancelCallback()
        }


        const editButton = () => {
            setEditMode(true);
        };
        const {loadImages} = ImageLoader({newImages, setNewImages})

        const validate = () => {
            if (relative.name.length < 2) {
                dispatch(setModal({
                    title: 'Внимание!',
                    bodyText: 'Проверьте имя!',
                    buttons: [
                        {
                            title: 'Закрыть',
                        },
                    ],
                }))
                return false;
            }

            return true;
        };

        useFocusEffect(
            React.useCallback(() => {
                return () => resetState();
            }, [])
        );
        return (
            <KeyboardAwareScrollView style={globalStyles.scrollBottomMargin}>
                <>
                    <UserPicComponent
                        imageUri={newImages[0] ? {
                            uri: newImages[0].path,
                            local: true
                        } : relative.userPic === '' ? {
                            uri: defaultRelativeUserPic,
                            local: true
                        } : {uri: relative.userPic}}
                        editMode={editMode}
                        imageChangeButton={loadImages}
                    />

                    <View style={[globalStyles.paddingWrapper, globalStyles.paddingTop]}>
                        <EditPersonalComponent
                            text={relative.name}
                            setText={data => setRelative({...relative, name: data})}
                            editMode={editMode}
                            editDescription={'Имя'}
                        />

                        <CalendarComponent
                            editMode={editMode}
                            editDescription={'Дата рождения'}
                            date={relative.birthday}
                            setDate={data => setRelative({...relative, birthday: data})}
                        />

                        {editMode && (
                            <RelativeTypesListComponent
                                editDescription={'Тип родственника'}
                                type={type}
                                setType={setType}
                            />
                        )}

                    </View>
                    {(relative.about !== '' || editMode) && <CloudContainer
                        text={relative.about}
                        editDescription={'Краткая биография'}
                        editMode={editMode}
                        setAbout={data => setRelative({...relative, about: data})}
                    />}
                    <View
                        style={[
                            globalStyles.paddingWrapper, globalStyles.paddingTop
                        ]}>
                        {editMode ?
                            <>
                                {/*{showSaveButton && (*/}
                                <ButtonComponent title={'Сохранить'} callBack={saveButton} type={'invert'}/>
                                {/*)}*/}
                                <ButtonComponent title={'Отменить'} callBack={cancelButton}/>
                            </>
                            :
                            <>
                                <ButtonComponent title={'Редактировать'} callBack={editButton} type={'invert'}/>
                            </>
                        }
                    </View>
                </>
            </KeyboardAwareScrollView>
        );
    };

export default RelativeComponent;
