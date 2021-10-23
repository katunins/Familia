import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import globalStyles from '../../styles/styles';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {actionSignUp} from '../../store/slice/firebase.slice';
import ButtonComponent from "../../components/button";
import {resetModal, setModal} from "../../store/slice/modal.slice";
import {actionToDeleteRelative} from "../../store/slice/relatives.slice";

interface IProps {
}

const SignUpScreen: React.FunctionComponent<IProps> = navigation => {
    const [email, setEmail] = useState('katunin.pavel@gmail.com');
    const [password, setPassword] = useState('wellcome');
    const [passwordCheck, setPasswordCheck] = useState('wellcome');
    const [name, setName] = useState('Павел');

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
        <View style={[globalStyles.verticalCentre, globalStyles.paddingWrapper]}>
            <Text style={globalStyles.title}>Авторизация</Text>

            <TextInput
                value={name}
                autoCorrect={false}
                onChangeText={setName}
                placeholder={'Имя'}
                textAlign={'center'}
                style={[
                    globalStyles.strokeForm,
                    globalStyles.buttonMargin,
                    ,
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
                style={[globalStyles.strokeForm, globalStyles.buttonMargin]}
            />

            <ButtonComponent title={'Регистрация'} callBack={buttonSubmit} type={"invert"}/>
        </View>
    );
};

export default SignUpScreen;
