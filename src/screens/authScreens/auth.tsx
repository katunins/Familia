import {View, Text, Pressable} from 'react-native';
import React from 'react';
import globalStyles from '../../styles/styles';
import styles from '../authScreens/styles';
import ButtonComponent from "../../components/button";
import {useNavigation} from "@react-navigation/native";

const AuthScreen: React.FunctionComponent = () => {
    const navigation = useNavigation()
    const pressAgreement = () => {
    };

    const signInButtonPress = () => {
        navigation.navigate('SignInScreen');
    };

    const emailSignUp = () => {
        navigation.navigate('SignUpScreen');
    };

    const forgotPasswordButton = () => {
    };

    return (
        <View style={[globalStyles.paddingWrapper, globalStyles.verticalCentre, globalStyles.containerColor]}>
            <Text style={[globalStyles.title, globalStyles.marginBottom]}>Авторизация</Text>

            <ButtonComponent title={'Войти с помощью e-mail'} callBack={signInButtonPress}/>
            <ButtonComponent title={'Регистрация'} callBack={emailSignUp} type={'invert'}/>

            <Pressable onPress={forgotPasswordButton}>
                <Text style={[globalStyles.linkButton, styles.passRestoreWrapper]}>
                    Восстановить пароль
                </Text>
            </Pressable>

            <Pressable onPress={pressAgreement} style={styles.agreementWrapper}>
                <Text>
                    Передавая данные, вы соглашаетесь c политикой конфиденциальности
                    персональной информации
                </Text>
            </Pressable>
        </View>
    );
};

export default AuthScreen;
