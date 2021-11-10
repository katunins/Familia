import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from '../screens/userScreen';
import HeaderComponent from "../components/header";
import {useSelector} from "react-redux";
import {loaderSelector} from "../store/selectors";
import LoaderComponent from "../components/loader";


const Stack = createStackNavigator<IUserStackParamList>();
type IUserStackParamList = {
    UserScreen: undefined
}
const UserStack = () => {
    const loader = useSelector(loaderSelector)
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    title: 'Личный кабинет',
                    headerRight: ()=><LoaderComponent/>
                }}
                name="UserScreen"
                component={UserScreen}
            />

        </Stack.Navigator>
    );
};

export default UserStack;
