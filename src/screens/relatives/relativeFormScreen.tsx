import React from 'react';
import {ScrollView} from 'react-native';
import {IRelative, IRelativeTypes, IServerRelative} from '../../interfaces/store';
import {useDispatch, useSelector} from 'react-redux';
import {actionAddRelative, actionUpdateRelative} from '../../store/slice/relatives.slice';
import {userSelector} from "../../store/selectors";
import RelativeComponent from "../../components/relativeComponent";
import {Image} from "react-native-image-crop-picker";
import {actionUserUpdate} from "../../store/slice/user.slice";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/declare.navigation";

export interface ISaveRelativeCallback {
    relativeData: IRelative;
    newImage?: Image
    callBack?: () => void
}

const RelativeFormScreen: React.FunctionComponent =() => {
        const dispatch = useDispatch();
        const user = useSelector(userSelector);

        const route=useRoute<RouteProp<RootStackParamList, 'RelativeFormScreen'>>()
    const navigation = useNavigation()
        const initialRelativeData = route.params.relativeData
        /**
         * кнопка сохранить Родственника
         * @param data - данные родственника
         */

        const saveCallback = ({relativeData, callBack, newImage}: ISaveRelativeCallback) => {
            navigation.navigate('RelativeListScreen', {noUpdateList: true})

            const data = {
                relativeData,
                newImage,
                callBack: () => {
                    callBack && callBack()
                }
            }
            dispatch(relativeData._id ?
                actionUpdateRelative(data) : actionAddRelative(data)
            );

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
                    // relativeType={getRelativeType({
                    //     user,
                    //     relative: initialRelativeData
                    // })}
                />
            </ScrollView>
        );
    };

export default RelativeFormScreen;
