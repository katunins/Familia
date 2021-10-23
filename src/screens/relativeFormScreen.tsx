import React from 'react';
import UserComponent from '../components/userComponent';
import {ScrollView} from 'react-native';
import {IRelative, IUser} from '../interfaces/store';
import {useDispatch, useSelector} from 'react-redux';
import userSelector from '../store/selectors';
import {actionNewRelative, actionUpdateRelative} from '../store/slice/relatives.slice';
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../interfaces/navigation";
import {getRelativeType} from "../helpers/utils";

export interface ISaveUserCallback {
    userData: IRelative | IUser;
    type?: string;
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
        const selectUser = useSelector(userSelector);

        /**
         * кнопка сохранить Родственника
         * @param data - данные родственника
         */

        const saveCallback = ({userData, type}: ISaveUserCallback) => {
            if (userData.id === '') {
                dispatch(
                    actionNewRelative({
                        userData,
                        // @ts-ignore
                        creatorData: {type: type, creatorId: selectUser.id}
                    }),
                );
            } else {
                dispatch(
                    actionUpdateRelative({
                        userData,
                        // @ts-ignore
                        creatorData: {type: type, creatorId: selectUser.id}
                    }),
                );
            }
            navigation.goBack()//редактирование пользователя
        };

        const cancelCallback = () => {
            navigation.goBack()
        }
        const relativeData = route.params?.relativeData
        return (
            <ScrollView>
                {relativeData && <UserComponent
                    saveCallback={saveCallback}
                    cancelCallback={cancelCallback}
                    defaultEditMode={true}
                    initialUser={relativeData}
                    userType={'relative'}
                    relativeType={relativeData?.id === '' ? 'other' : getRelativeType({
                        userRelatives: selectUser.relatives,
                        id: relativeData?.id
                    })}
                />}
            </ScrollView>
        );
    };

export default RelativeFormScreen;
