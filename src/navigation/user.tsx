import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from '../screens/userScreen';
import {RootStackParamList} from "../interfaces/navigation";

const Stack = createStackNavigator<RootStackParamList>();

const UserStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    title: 'Личный кабинет'
                }}
                name="UserScreen"
                component={UserScreen}
            />
        </Stack.Navigator>
    );
};

export default UserStack;
