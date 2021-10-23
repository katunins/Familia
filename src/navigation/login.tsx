import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from "../screens/authScreens/auth";
import SignUpScreen from "../screens/authScreens/signUp";
import SignInScreen from "../screens/authScreens/signIn";
import {RootStackParamList} from "../interfaces/navigation";

const Stack = createStackNavigator<RootStackParamList>();

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Авторизация',
        }}
        name="AuthScreen" component={AuthScreen}/>
      <Stack.Screen
        options={{
          title: 'Регистрация',
        }}
        name="SignUpScreen" component={SignUpScreen}/>
      <Stack.Screen
      options={{
        title: 'Вход',
      }}
      name="SignInScreen" component={SignInScreen}/>
    </Stack.Navigator>

  );
}

export default LoginStack
