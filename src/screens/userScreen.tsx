import React from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {relativesSelector, userSelector} from '../store/selectors';
import UserComponent from '../components/userComponent';
import {actionLogOut} from '../store/slice/firebase.slice';
import {actionUserUpdate} from '../store/slice/user.slice';
import ButtonComponent from "../components/button";
import {IRelative, IUser} from "../interfaces/store";
import {initialUser} from "../config";


export interface ISaveUserCallback {
    userData: IUser;
    callBack: () => void
}
const UserScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const selectRelative = useSelector(relativesSelector);
    const selectUser = useSelector(userSelector);

    const logOut = () => {
        dispatch(actionLogOut());
    };

    const saveCallback = (userData: ISaveUserCallback) => {
        dispatch(actionUserUpdate(userData));
    };


    let relativesArr: IRelative[] = [];
    selectRelative.map(item => {
        const result = selectUser.relatives.filter(el => el.id === item._id);
        if (result.length > 0) {
            // @ts-ignore
            relativesArr.push({...item, type: result[0].type});
        }
    });

    return (
        <ScrollView>
            <UserComponent
                initialUser={selectUser || initialUser}
                saveCallback={saveCallback}
                buttonLogOut={<ButtonComponent title={'Выход из аккаунта'} callBack={logOut}/>}
            />
        </ScrollView>
    );
};

export default UserScreen;
