import {View, TextInput, Text} from "react-native";
import React from "react";
import ButtonComponent from "../../components/button";
import styles from "./styles";
import globalStyles from "../../styles/styles";
import {containerWidth} from "../../helpers/utils";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {INoteData} from "../../interfaces/store";
import {NavigationScreenProp} from "react-navigation";
import ImageAndCountComponent from "../../components/imageAndCount";
import {Image} from "react-native-image-crop-picker";
import {useDispatch} from "react-redux";
import {setModal} from "../../store/slice/modal.slice";

interface IProps {
    navigation: NavigationScreenProp<{}>
    note: INoteData,
    setNote: (note: INoteData) => void
    newImages: Image[]
}

const DescriptionScreen = ({navigation, note, setNote, newImages}: IProps) => {

    const dispatch = useDispatch()
    const nextStep = () => {
        if (note.title === '') {
            dispatch(setModal({
                title: 'Ошибка!',
                bodyText: 'Заголовок не может быть пустым!',
                buttons: [{
                    title: 'Понятно',
                    callBack: () => {
                    }
                }]
            }))
            return
        }
        navigation.navigate('NewNoteRelatives')
    }
    const openDatePicker = () => {}

    return (
        <KeyboardAwareScrollView  style={globalStyles.scrollBottomMargin}>
            <ImageAndCountComponent
                uriArr={[...newImages.map(item => item.path), ...note.images]}
                width={containerWidth} callBack={() => navigation.goBack()}/>
            <View style={styles.container}>
                <View style={globalStyles.marginLine}/>
                <View>
                    <ButtonComponent title={'Выберете год'} callBack={openDatePicker} />
                </View>
                <TextInput
                    value={note.title}
                    autoCorrect={false}
                    onChangeText={title => setNote({...note, title: title})}
                    placeholder={'Первая квартира наших родителей'}
                    style={[globalStyles.strokeForm, globalStyles.buttonMargin]}
                />
                <TextInput
                    value={note.description}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={description => setNote({...note, description: description})}
                    placeholder={'Первая квартира наших родителей'}
                    multiline={true}
                    style={[globalStyles.strokeForm, globalStyles.textAreaForm, globalStyles.buttonMargin, styles.paddingTextArea]}
                />
                <ButtonComponent title={'Далее'} callBack={nextStep} type={'invert'}/>
                <ButtonComponent title={'Назад'} callBack={navigation.goBack}/>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default DescriptionScreen
