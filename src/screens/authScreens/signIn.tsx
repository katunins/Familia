import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import styles from './styles';
import {useDispatch} from 'react-redux';
import globalStyles from '../../styles/styles';
import ButtonComponent from "../../components/button";
import {actionSignIn} from "../../store/slice/user.slice";
import EStyleSheet from "react-native-extended-stylesheet";

interface IProps {}

const SignInScreen: React.FunctionComponent<IProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const clearPassword = () => {
    setPassword('');
  };

  const buttonSubmit = () => {
    dispatch(
      actionSignIn({
        data: {email: email, password: password},
      }),
    );
  };

  return (
    <View style={[globalStyles.verticalCentre, globalStyles.paddingWrapper, globalStyles.containerColor]}>
      <Text style={globalStyles.title}>Вход по email</Text>

      <TextInput
        value={email}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={setEmail}
        placeholder={'email'}
        textAlign={'center'}
        keyboardType={'email-address'}
        placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
        style={[globalStyles.strokeForm, globalStyles.buttonMargin, globalStyles.marginTop]}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        autoCapitalize={'none'}
        autoCorrect={false}
        placeholder={'password'}
        textAlign={'center'}
        secureTextEntry={true}
        style={[globalStyles.strokeForm, globalStyles.buttonMargin]}
        placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
        onFocus={clearPassword}
      />
            <ButtonComponent title={'Вход'} callBack={buttonSubmit} type={'invert'}/>

      <Pressable style={styles.passRestoreWrapper}>
        <Text style={globalStyles.linkButton}>Восстановить пароль</Text>
      </Pressable>
    </View>
  );
};

export default SignInScreen;
