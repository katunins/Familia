import React, {useState} from 'react';
import { Text, TextInput, View} from 'react-native';
import globalStyles from '../../styles/styles';
import {useDispatch} from 'react-redux';
import ButtonComponent from "../../components/button";
import {setModal} from "../../store/slice/modal.slice";
import {actionSignUp} from "../../store/slice/user.slice";
import EStyleSheet from "react-native-extended-stylesheet";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

interface IProps {
}

const SignUpScreen: React.FunctionComponent<IProps> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const buttonSubmit = () => {
        if (name === '') {
            dispatch(setModal({
                title: 'Внимание!',
                bodyText: 'Введите имя!',
                buttons: [
                    {
                        title: 'Закрыть',
                    },
                ],
            }))
            return;
        }
        if (email === '') {
            dispatch(setModal({
                title: 'Внимание!',
                bodyText: 'Введите email!',
                buttons: [
                    {
                        title: 'Закрыть',
                    },
                ],
            }))
            return;
        }
        if (password === '') {
            dispatch(setModal({
                title: 'Внимание!',
                bodyText: 'Введите пароль!',
                buttons: [
                    {
                        title: 'Закрыть',
                    },
                ],
            }))
            return;
        }
        if (password !== passwordCheck) {
            dispatch(setModal({
                title: 'Внимание!',
                bodyText: 'Пароли не совпадают!',
                buttons: [
                    {
                        title: 'Закрыть',
                    },
                ],
            }))
            return;
        }

        dispatch(
            actionSignUp({
                data: {name: name, email: email, password: password}
            }),
        );
    };
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={[globalStyles.verticalCentre, globalStyles.paddingWrapper, globalStyles.containerColor]}
            extraHeight={100}
        >
            <Text style={globalStyles.title}>Авторизация</Text>

            <TextInput
                value={name}
                autoCorrect={false}
                onChangeText={setName}
                placeholder={'Имя'}
                textAlign={'center'}
                placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
                style={[
                    globalStyles.strokeForm,
                    globalStyles.buttonMargin,
                    globalStyles.marginTop,
                ]}
            />
            <TextInput
                value={email}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={setEmail}
                placeholder={'email'}
                textAlign={'center'}
                keyboardType={'email-address'}
                placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
                style={[globalStyles.strokeForm, globalStyles.buttonMargin]}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholder={'Пароль'}
                textAlign={'center'}
                secureTextEntry={true}
                placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
                style={[
                    globalStyles.strokeForm,
                    globalStyles.buttonMargin,
                    globalStyles.marginTop,
                ]}
            />
            <TextInput
                value={passwordCheck}
                onChangeText={setPasswordCheck}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholder={'Повторите пароль'}
                textAlign={'center'}
                secureTextEntry={true}
                placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
                style={[globalStyles.strokeForm, globalStyles.buttonMargin]}
            />

            <ButtonComponent title={'Регистрация'} callBack={buttonSubmit} type={"invert"}/>
        </KeyboardAwareScrollView>
    );
};

export default SignUpScreen;
