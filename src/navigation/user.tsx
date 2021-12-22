import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from '../screens/userScreen';
import LoaderComponent from "../components/loader";
import {RootStackParamList} from "./declare.navigation";


const Stack = createStackNavigator<RootStackParamList>();
const UserStack = () => {
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
