import React from 'react';
import {ScrollView} from 'react-native';
import {IRelative, IRelativeTypes, IUser} from '../interfaces/store';
import {useDispatch, useSelector} from 'react-redux';
import {actionNewRelative, actionUpdateRelative} from '../store/slice/relatives.slice';
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../interfaces/navigation";
import {getRelativeType} from "../helpers/utils";
import {userSelector} from "../store/selectors";
import RelativeComponent from "../components/relativeComponent";
import {Image} from "react-native-image-crop-picker";
import {actionUserUpdate} from "../store/slice/user.slice";

export interface ISaveRelativeCallback extends IRelativeTypes {
    relativeData: IRelative;
    newImage?: Image
    callBack?: () => void
}

type IProps = NativeStackScreenProps<RootStackParamList, 'RelativeFormScreen'>;
/**
 * Экран формы создания / редактирования родственников
 * @param userData - объет пользователя родственника (если нет, то создается новый)
 * @param relativesData - родтсвенники родственника
 * @constructor
 */
const RelativeFormScreen: React.FunctionComponent<IProps> =
    ({
         navigation,
         route
     }) => {
        const dispatch = useDispatch();
        const user = useSelector(userSelector);
        const initialRelativeData = route.params.relativeData
        /**
         * кнопка сохранить Родственника
         * @param data - данные родственника
         */

        const saveCallback = ({relativeData, type, callBack, newImage}: ISaveRelativeCallback) => {
            const data = {
                relativeData,
                type,
                newImage,
                callBack: () => {
                    if (callBack) callBack()
                    navigation.goBack()//редактирование пользователя
                }
            }
            if (relativeData._id !== '') {
                const relativeIndex = user.relatives.find(item => item.id === relativeData._id)
                if (relativeIndex?.type !== type) {
                    const relatives = user.relatives.map(item => item.id === relativeData._id ? {
                        id: relativeData._id,
                        type
                    } : item)
                    dispatch(actionUserUpdate({
                        userData: {...user, relatives}
                    }))
                }
            }
            dispatch(relativeData._id ?
                actionUpdateRelative(data) : actionNewRelative(data)
            );

        };

        const cancelCallback = () => {
            navigation.goBack()
        }
        return (
            <ScrollView>
                <RelativeComponent
                    saveCallback={saveCallback}
                    cancelCallback={cancelCallback}
                    defaultEditMode={true}
                    initialRelative={initialRelativeData}
                    //@ts-ignore
                    relativeType={getRelativeType({
                        user,
                        relative: initialRelativeData
                    })}
                />
            </ScrollView>
        );
    };

export default RelativeFormScreen;
