import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RelativeFormScreen from "../screens/relatives/relativeFormScreen";
import RelativeListScreen from "../screens/relatives/relativeListScreen";
import {RootStackParamList} from "../interfaces/navigation";
import LoaderComponent from "../components/loader";
import RelativeDetailScreen from "../screens/relatives/detailScreen";


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
                name={'RelativeDetailScreen'}
                component={RelativeDetailScreen}
                options={{
                    title: '',
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
        </Stack.Navigator>
    );
};
export {RelativeStack};
