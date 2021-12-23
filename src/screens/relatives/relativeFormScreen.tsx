import React from 'react';
import {ScrollView} from 'react-native';
import {IRelative, IServerRelative} from '../../interfaces/store';
import {useDispatch} from 'react-redux';
import {actionAddRelative, actionUpdateRelative} from '../../store/slice/relatives.slice';
import RelativeComponent from "../../components/relativeComponent";
import {Image} from "react-native-image-crop-picker";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/declare.navigation";

export interface ISaveRelativeCallback {
    newImage?: Image
    callBack?: () => void
}

export interface IAddRelativeData {
    relativeData: IServerRelative
}

export interface ISaveRelativeData {
    relativeData: IRelative
}

const RelativeFormScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    const route = useRoute<RouteProp<RootStackParamList, 'RelativeFormScreen'>>()
    const navigation = useNavigation()
    const initialRelativeData = route.params.relativeData
    /**
     * кнопка сохранить Родственника
     * @param data - данные родственника
     */
    const addCallBack = ({relativeData, callBack, newImage}: ISaveRelativeCallback extends IAddRelativeData) => {
        const data = {
            relativeData,
            newImage,
            callBack: () => {
                callBack && callBack()
            }
        }
        navigation.navigate('RelativeListScreen', {noUpdateList: true})
        dispatch(actionAddRelative(data))
    }
    const saveCallback = ({relativeData, callBack, newImage}: ISaveRelativeCallback extends ISaveRelativeCallback) => {
        const data = {
            relativeData,
            newImage,
            callBack: () => {
                callBack && callBack()
            }
        }
        navigation.navigate('RelativeListScreen', {noUpdateList: true})
        dispatch(actionUpdateRelative(data))
    };

    const cancelCallback = () => {
        navigation.goBack()
    }

    return (
        <ScrollView>
            <RelativeComponent
                saveCallback={initialRelativeData ? addCallBack : saveCallback}
                cancelCallback={cancelCallback}
                defaultEditMode={true}
                initialRelative={initialRelativeData}
            />
        </ScrollView>
    );
};

export default RelativeFormScreen;
