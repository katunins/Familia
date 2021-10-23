import {View, Text, Image, Pressable, TextInput} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../../styles/styles';
import styles from '../authScreens/styles';
import {NavigationScreenProp} from 'react-navigation';
import GoogleIcon from '../../ui/svg/googleIcon';
import AppleIcon from '../../ui/svg/appleIcon';
import ButtonComponent from "../../components/button";

interface IProps {
    navigation: NavigationScreenProp<any>;
}

const AuthScreen: React.FunctionComponent<IProps> = ({navigation}) => {
    const pressAppleButton = () => {
    };
    const pressGoogleButton = () => {
    };
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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={[globalStyles.paddingWrapper, globalStyles.verticalCentre]}>
            <Text style={[globalStyles.title, globalStyles.marginBottom]}>Авторизация</Text>

            {/*<Pressable*/}
            {/*  style={[*/}
            {/*    globalStyles.strokeForm,*/}
            {/*    globalStyles.buttonMargin,*/}
            {/*    globalStyles.marginTop,*/}
            {/*  ]}*/}
            {/*  onPress={pressAppleButton}>*/}
            {/*  <GoogleIcon />*/}
            {/*  <Text> Google</Text>*/}
            {/*</Pressable>*/}

            {/*<Pressable*/}
            {/*  style={[*/}
            {/*    globalStyles.strokeForm,*/}
            {/*    globalStyles.buttonMargin,*/}
            {/*    styles.iOsButtonWrapper,*/}
            {/*  ]}*/}
            {/*  onPress={pressGoogleButton}>*/}
            {/*  <AppleIcon />*/}
            {/*  <Text style={styles.iOsButtonText}> Apple</Text>*/}
            {/*</Pressable>*/}

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
