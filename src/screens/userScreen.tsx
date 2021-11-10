import React from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector} from '../store/selectors';
import UserComponent from '../components/userComponent';
import {actionLogOut, actionUserUpdate} from '../store/slice/user.slice';
import ButtonComponent from "../components/button";
import {IUser} from "../interfaces/store";
import {initialUser} from "../config";
import {Image} from "react-native-image-crop-picker";


export interface ISaveUserCallback {
    userData: IUser;
    newImage?: Image
    callBack?: (newUser: IUser) => void
}

const UserScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const selectUser = useSelector(userSelector);
    const logOut = () => {
        dispatch(actionLogOut());
    };

    const saveCallback = (userData: ISaveUserCallback) => {
        dispatch(actionUserUpdate(userData));
    };

    return (
        <ScrollView style={{flex: 1}}>
            <UserComponent
                initialUser={selectUser || initialUser}
                saveCallback={saveCallback}
                buttonLogOut={<ButtonComponent title={'Выход из аккаунта'} callBack={logOut}/>}
            />
        </ScrollView>
    );
};

export default UserScreen;
