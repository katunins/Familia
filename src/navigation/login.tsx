import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from "../screens/authScreens/auth";
import SignUpScreen from "../screens/authScreens/signUp";
import SignInScreen from "../screens/authScreens/signIn";
import LoaderComponent from "../components/loader";
import {RootStackParamList} from "./declare.navigation";


const Stack = createStackNavigator<RootStackParamList>();

const LoginStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    title: 'Авторизация',
                    headerRight: ()=><LoaderComponent/>
                }}
                name="AuthScreen" component={AuthScreen}/>
            <Stack.Screen
                options={{
                    title: 'Регистрация',
                    headerRight: ()=><LoaderComponent/>

                }}
                name="SignUpScreen" component={SignUpScreen}/>
            <Stack.Screen
                options={{
                    title: 'Вход',
                    headerRight: ()=><LoaderComponent/>
                }}
                name="SignInScreen" component={SignInScreen}/>
        </Stack.Navigator>

    );
}

export default LoginStack
