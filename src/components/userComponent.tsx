import React, {useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TouchableWithoutFeedback, View} from 'react-native';
import globalStyles from '../styles/styles';
import EditPersonalComponent from './editComponent';
import CalendarComponent from './calendarComponent';
import CloudContainer from './cloudContainer';
import {IRelative, IUser} from '../interfaces/store';
import ImagePicker from 'react-native-image-crop-picker';
import UserPicComponent from './userPicComponent';
import {useDispatch} from 'react-redux';
import RelativeTypesListComponent from './relativeTypesListComponent';
import {useFocusEffect} from "@react-navigation/native";
import ButtonComponent from "./button";
import {ISaveRelativeCallback} from "../screens/relativeFormScreen";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../interfaces/navigation";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {resetModal, setModal} from "../store/slice/modal.slice";
import {actionToDeleteRelative} from "../store/slice/relatives.slice";
import {defaultUserPic} from "../config";
import {ISaveUserCallback} from "../screens/userScreen";

interface IProps {
    initialUser: IUser
    saveCallback: (data: ISaveUserCallback) => void;
    buttonLogOut: React.ReactElement
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

const UserComponent: React.FunctionComponent<IProps> =
    ({
         initialUser,
         saveCallback,
         buttonLogOut,
     }) => {

        const [editMode, setEditMode] = useState(false);
        const [user, setUser] = useState(initialUser);

        const dispatch = useDispatch();


        const saveButton = () => {
            if (!validate()) return false;
            if (JSON.stringify(initialUser) === JSON.stringify(user)) return false
            saveCallback({userData: user, callBack: () => setEditMode(false)});
        };


        const cancelButton = () => {
            setEditMode(false);
        }


        const editButton = () => {
            setEditMode(true);
        };

        const imageChangeButton = () => {
            ImagePicker.openPicker({
                mediaType: 'photo',
                width: 800,
                height: 800,
                compressImageMaxHeight: 800,
                compressImageMaxWidth: 800,
                cropping: true,
            }).then(image => {
                setUser({...user, userPic: image.path});
            }).catch(e => {
                console.log(e)
            });
        };

        const validate = () => {
            if (user.name.length < 2) {
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
                return () => setEditMode(false);
            }, [])
        );

        return (
            <KeyboardAwareScrollView style={globalStyles.scrollBottomMargin}>
                <>
                    <UserPicComponent
                        userPic={
                            user.userPic || defaultUserPic
                        }
                        editMode={editMode}
                        imageChangeButton={imageChangeButton}
                    />

                    <View style={[globalStyles.paddingWrapper, globalStyles.paddingTop]}>
                        <EditPersonalComponent
                            text={user.name}
                            setText={data => setUser({...user, name: data})}
                            editMode={editMode}
                            editDescription={'Имя'}
                        />

                        <CalendarComponent
                            editMode={editMode}
                            editDescription={'Дата рождения'}
                            date={user.birthday}
                            setDate={data => setUser({...user, birthday: data})}
                        />

                    </View>
                    {(user.about !== '' || editMode) && <CloudContainer
                        text={user.about}
                        editDescription={'Краткая биография'}
                        editMode={editMode}
                        setAbout={data => setUser({...user, about: data})}
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
                                {buttonLogOut}
                            </>
                        }
                    </View>
                </>
            </KeyboardAwareScrollView>
        );
    };

export default UserComponent;
