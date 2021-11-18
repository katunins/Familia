import React, {useState} from 'react';
import {Text, View} from 'react-native';
import globalStyles from '../styles/styles';
import EditPersonalComponent from './editComponent';
import CalendarComponent from './calendarComponent';
import CloudContainer from './cloudContainer';
import {IUser} from '../interfaces/store';
import {Image} from 'react-native-image-crop-picker';
import UserPicComponent from './userPicComponent';
import {useFocusEffect} from "@react-navigation/native";
import ButtonComponent from "./button";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {defaultUserPic} from "../config";
import {ISaveUserCallback} from "../screens/userScreen";
import ImageLoader from "../helpers/imageLoader";
import {useDispatch} from "react-redux";
import {setModal} from "../store/slice/modal.slice";
import CameraIcon from "../ui/svg/cameraIcon";
import GalleryIcon from "../ui/svg/galeryIcon";

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
        const [newImage, setNewImage] = useState<Image>();
        const {loadImages, loadCamera} = ImageLoader({setNewImage})

        const addImageModal = () => {
            dispatch(setModal({
                title: 'Добавление фотографий',
                buttons: [
                    {
                        title: 'Камера',
                        icon: CameraIcon(),
                        callBack: loadCamera
                    },
                    {
                        title: 'Галерея',
                        icon: GalleryIcon(),
                        callBack: loadImages
                    }
                ]
            }))
        }

        const dispatch = useDispatch()

        const saveButton = () => {
            if (!validate()) return false;
            setEditMode(false)
            saveCallback({
                userData: user,
                newImage,
                callBack: reset,
            });
        };

        const cancelButton = () => {
            setEditMode(false);
        }
        const editButton = () => {
            setEditMode(true);
        };
        const reset = (newUser:IUser) => {
            setNewImage(undefined)
            setUser(newUser)
            setEditMode(false)
        }
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
                return () => reset
            }, [])
        );
        return (
            <KeyboardAwareScrollView style={globalStyles.scrollBottomMargin}>
                <>
                    <UserPicComponent
                        uri={newImage?.path || user.userPic || defaultUserPic}
                        editMode={editMode}
                        imageChangeButton={addImageModal}
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
                                <ButtonComponent
                                    title={'Сохранить'}
                                    callBack={saveButton}
                                    type={'invert'}
                                    disabled={JSON.stringify(initialUser) === JSON.stringify(user) && !newImage}/>
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
