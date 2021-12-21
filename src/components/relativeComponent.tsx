import React, {useState} from 'react';
import {View} from 'react-native';
import globalStyles from '../styles/styles';
import EditPersonalComponent from './editComponent';
import CalendarComponent from './calendarComponent';
import CloudContainer from './cloudContainer';
import {IRelative, IRelativeTypes} from '../interfaces/store';
import {Image} from 'react-native-image-crop-picker';
import UserPicComponent from './userPicComponent';
import RelativeTypesListComponent from './relativeTypesListComponent';
import {useFocusEffect} from "@react-navigation/native";
import ButtonComponent from "./button";
import {ISaveRelativeCallback} from "../screens/relatives/relativeFormScreen";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ImageLoader from "../helpers/imageLoader";
import {idGenerator} from "../helpers/utils";
import {defaultUserPic} from "../config";
import {setModal} from "../store/slice/modal.slice";
import {useDispatch} from "react-redux";
import CameraIcon from "../ui/svg/cameraIcon";
import GalleryIcon from "../ui/svg/galeryIcon";
import SelectParentsComponent from "./selectParents";
import SeparatorComponent from "./separator";

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
        const [newImage, setNewImage] = useState<Image>();

        const dispatch = useDispatch();

        const saveButton = () => {
            if (!validate()) return false;
            setEditMode(false)
            saveCallback({
                relativeData: relative,
                type,
                newImage,
                // callBack: reset,
            });
        };

        const cancelButton = () => {
            setEditMode(false);
            cancelCallback && cancelCallback()
        }
        const reset = () => {
            setNewImage(undefined)
            setRelative(initialRelative)
            setEditMode(false)
        }
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
                return () => reset
            }, [])
        );
        return (
            <KeyboardAwareScrollView style={globalStyles.scrollBottomMargin}>
                <>
                    <UserPicComponent
                        uri={newImage?.path || relative.userPic || defaultUserPic}
                        editMode={editMode}
                        imageChangeButton={addImageModal}
                    />

                    <View style={[globalStyles.paddingWrapper, globalStyles.paddingTop]}>
                        <EditPersonalComponent
                            text={relative.name}
                            setText={data => setRelative({...relative, name: data})}
                            editMode={editMode}
                            editDescription={'Имя'}
                        />
                        <SelectParentsComponent
                            description={'Мать'}
                            editMode={editMode}
                            value={relative.parents.mother}
                            setValue={(id)=>setRelative({...relative, parents: {...relative.parents, mother: id}})}
                        />
                        <SelectParentsComponent
                            description={'Отец'}
                            editMode={editMode}
                            value={relative.parents.father}
                            setValue={(id)=>setRelative({...relative, parents: {...relative.parents, father: id}})}
                        />
                        <CalendarComponent
                            editMode={editMode}
                            editDescription={'Дата рождения'}
                            date={relative.birthday}
                            setDate={data => setRelative({...relative, birthday: data})}
                        />

                        {/*{editMode && (*/}
                        {/*    <RelativeTypesListComponent*/}
                        {/*        editDescription={'Тип родственника'}*/}
                        {/*        type={type}*/}
                        {/*        setType={setType}*/}
                        {/*    />*/}
                        {/*)}*/}



                    </View>
                    {(relative.about !== '' || editMode) &&
                    <CloudContainer
                        text={relative.about}
                        editDescription={'Краткая биография'}
                        editMode={editMode}
                        setAbout={data => setRelative({...relative, about: data})}
                    />}
                    <View
                        style={[
                            globalStyles.paddingWrapper, globalStyles.paddingTop
                        ]}>
                        <ButtonComponent title={'Сохранить'} callBack={saveButton} type={'invert'}
                                         disabled={(JSON.stringify(initialRelative) === JSON.stringify(relative) && !newImage && type === relativeType) || !editMode}/>
                        <ButtonComponent title={'Отменить'} callBack={cancelButton}/>
                    </View>
                </>
            </KeyboardAwareScrollView>
        );
    };

export default RelativeComponent;
