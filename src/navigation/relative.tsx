import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RelativeFormScreen from "../screens/relatives/relativeFormScreen";
import RelativeListScreen from "../screens/relatives/relativeListScreen";
import {RootStackParamList} from "../interfaces/navigation";
import LoaderComponent from "../components/loader";
import RelativeScreen from "../screens/relatives/relativeScreen";


const Stack = createStackNavigator<RootStackParamList>();
const RelativeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'RelativeListScreen'}
                component={RelativeListScreen}
                options={{
                    title: 'Мои родственники',
                    headerRight: ()=><LoaderComponent/>
                }}
            />
            <Stack.Screen
                name={'RelativeFormScreen'}
                component={RelativeFormScreen}
                options={{
                    title: 'Редактирование родственника',
                    headerRight: ()=><LoaderComponent/>
                }}
            />
            <Stack.Screen
                name={'RelativeScreen'}
                component={RelativeScreen}
                options={{
                    headerRight: ()=><LoaderComponent/>
                }}
            />
        </Stack.Navigator>
    );
};
export {RelativeStack};
