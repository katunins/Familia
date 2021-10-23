import React from 'react';
import {ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import userSelector, {relativesSelector} from '../store/selectors';
import UserComponent from '../components/userComponent';
import {InitialUserObj} from '../helpers/utils';
import {actionLogOut} from '../store/slice/firebase.slice';
import {actionUserChange} from '../store/slice/user.slice';
import ButtonComponent from "../components/button";
import {ISaveUserCallback} from "./relativeFormScreen";
import {IRelative} from "../interfaces/store";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../interfaces/navigation";

const UserScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const selectRelative = useSelector(relativesSelector);
    const selectUser = useSelector(userSelector);

    const logOut = () => {
        dispatch(actionLogOut());
    };

    const saveCallback = (userData: ISaveUserCallback) => {
        dispatch(actionUserChange(userData));
    };


    let relativesArr: IRelative[] = [];
    selectRelative.map(item => {
        const result = selectUser.relatives.filter(el => el.id === item.id);
        if (result.length > 0) {
            // @ts-ignore
            relativesArr.push({...item, type: result[0].type});
        }
    });

    return (
        <ScrollView>
            <UserComponent
                initialUser={selectUser || InitialUserObj}
                saveCallback={saveCallback}
                selectRelative={selectRelative}
                userType={'user'}
                buttonLogOut={<ButtonComponent title={'Выход из аккаунта'} callBack={logOut}/>}
            />
        </ScrollView>
    );
};

export default UserScreen;
