import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RelativeFormScreen from "../screens/relativeFormScreen";
import RelativeListScreen from "../screens/relativeListScreen";
import {RootStackParamList} from "../interfaces/navigation";

const RelativeStack = () => {
    const Stack = createStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator >
            <Stack.Screen
                name={'RelativeListScreen'}
                component={RelativeListScreen}
                options={{title: 'Мои родственники'}}
            />
            <Stack.Screen
                name={'RelativeFormScreen'}
                component={RelativeFormScreen}
                options={{title: 'Редактирование родственников'}}
            />
        </Stack.Navigator>
    );
};
export {RelativeStack};
