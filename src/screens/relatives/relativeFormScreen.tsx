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
    relativeData: IRelative
}

export interface IAddRelativeCallback {
    newImage?: Image
    callBack?: () => void
    relativeData: IServerRelative
}

const RelativeFormScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    const route = useRoute<RouteProp<RootStackParamList, 'RelativeFormScreen'>>()
    const {relativeData} = route.params
    const navigation = useNavigation()

    /**
     * кнопка сохранить Родственника
     * @param data - данные родственника
     */
    const saveCallback = ({relativeData, callBack, newImage}: ISaveRelativeCallback | IAddRelativeCallback) => {
        const data = {
            relativeData,
            newImage,
            callBack: () => {
                callBack && callBack()
            }
        }
        navigation.navigate('RelativeListScreen', {noUpdateList: true})
        "_id" in relativeData ? dispatch(actionUpdateRelative(data as ISaveRelativeCallback)) : dispatch(actionAddRelative(data))
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
                initialRelative={relativeData}
            />
        </ScrollView>
    );
};

export default RelativeFormScreen;
