import React from 'react';
import {ScrollView} from 'react-native';
import {IRelative, IServerRelative} from '../../interfaces/store';
import {useDispatch, useSelector} from 'react-redux';
import {actionAddRelative, actionUpdateRelative} from '../../store/slice/relatives.slice';
import {userSelector} from "../../store/selectors";
import RelativeComponent from "../../components/relativeComponent";
import {Image} from "react-native-image-crop-picker";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/declare.navigation";

export interface ISaveRelativeCallback {
    relativeData: IRelative
    newImage?: Image
    callBack?: () => void
}

export interface IAddRelativeCallback {
    relativeData: IServerRelative;
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
            dispatch(relativeData?._id ?
                actionUpdateRelative(data) : actionAddRelative(data)
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
                />
            </ScrollView>
        );
    };

export default RelativeFormScreen;
