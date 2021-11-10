import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RelativeFormScreen from "../screens/relativeFormScreen";
import RelativeListScreen from "../screens/relativeListScreen";
import {RootStackParamList} from "../interfaces/navigation";
import HeaderComponent from "../components/header";
import ArrowBackIcon from "../ui/svg/arrowBack";
import LoaderComponent from "../components/loader";


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
        </Stack.Navigator>
    );
};
export {RelativeStack};
