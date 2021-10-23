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
import {ISaveUserCallback} from "../screens/relativeFormScreen";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../interfaces/navigation";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {resetModal, setModal} from "../store/slice/modal.slice";
import {actionToDeleteRelative} from "../store/slice/relatives.slice";

interface IProps {
    initialUser: IUser | IRelative;
    saveCallback: (data: ISaveUserCallback) => void;
    selectRelative?: IRelative[];
    relativeType?: string;
    userType?: 'user' | 'relative';
    // relativesArr?: IRelativeElement[];
    buttonLogOut?: React.ReactElement
    defaultEditMode?: boolean
    cancelCallback?: () => void
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
         relativeType = 'other',
         userType = 'user',
         // relativesArr,
         buttonLogOut,
         defaultEditMode = false,
         cancelCallback
     }) => {

        const [editMode, setEditMode] = useState(defaultEditMode);
        const [user, setUser] = useState<IUser | IRelative>(initialUser);
        const [type, setType] = useState(relativeType);

        const dispatch = useDispatch();


        const saveButton = () => {
            if (!validate()) return false;
            setEditMode(false);
            if (JSON.stringify(initialUser) === JSON.stringify(user) && relativeType === type) return false
            if (userType === 'relative') saveCallback({userData: user, type: type});
            else saveCallback({userData: user});
        };


        const cancelButton = () => {
            setEditMode(false);
            if (cancelCallback) cancelCallback()
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
                            user.userPic ||
                            'https://alpinabook.ru/resize/1100x1600/upload/iblock/6f9/6f9f5be9fb84ad912ca92b5a0839d9ef.jpg'
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

                        {userType === 'relative' && editMode && (
                            <RelativeTypesListComponent
                                editDescription={'Тип родственника'}
                                type={type}
                                setType={setType}
                            />
                        )}

                        {/*{relativesArr && (*/}
                        {/*    <RelativeListComponent*/}
                        {/*        relativesArr={relativesArr}*/}
                        {/*        editMode={editMode}*/}
                        {/*        navigation={navigation}*/}
                        {/*    />*/}
                        {/*)}*/}

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
