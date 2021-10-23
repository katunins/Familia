import {View, TextInput} from "react-native";
import React from "react";
import ButtonComponent from "../../components/button";
import styles from "./styles";
import globalStyles from "../../styles/styles";
import {containerWidth} from "../../helpers/utils";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {IPostData} from "../../interfaces/store";
import {NavigationScreenProp} from "react-navigation";
import ImageAndCountComponent from "../../components/imageAndCount";

interface IProps {
    navigation: NavigationScreenProp<{}>
    post: IPostData,
    setPost: (post: IPostData) => void
}

const DescriptionScreen = ({navigation, post, setPost}: IProps) => {

    const nextStep = () => {
        navigation.navigate('NewPostRelatives')
    }

    return (
        <KeyboardAwareScrollView>
            <ImageAndCountComponent images={post.images} width={containerWidth}/>
            <View style={styles.container}>
                <View style={globalStyles.marginLine}/>
                <TextInput
                    value={post.title}
                    autoCorrect={false}
                    onChangeText={title => setPost({...post, title: title})}
                    placeholder={'Первая квартира наших родителей'}
                    style={[globalStyles.strokeForm, globalStyles.buttonMargin]}
                />
                <TextInput
                    value={post.description}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={description => setPost({...post, description: description})}
                    placeholder={'Первая квартира наших родителей'}
                    multiline={true}
                    style={[globalStyles.strokeForm, globalStyles.textAreaForm, globalStyles.buttonMargin, styles.paddingTextArea]}
                />
                <ButtonComponent title={'Далее'} callBack={nextStep} type={'invert'}/>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default DescriptionScreen
