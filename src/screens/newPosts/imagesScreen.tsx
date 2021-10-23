import {View, Dimensions, FlatList} from "react-native";
import React from "react";
import ButtonComponent from "../../components/button";
import styles from "./styles";
import CameraIcon from "../../ui/svg/cameraIcon";
import GalleryIcon from "../../ui/svg/galeryIcon";
import globalStyles from "../../styles/styles";
import ImagePicker from "react-native-image-crop-picker";
import AutoHeightImage from "react-native-auto-height-image";
import PostImageComponent from "../../components/postImage";
import {IPostData} from "../../interfaces/store";
import {NavigationScreenProp} from "react-navigation";

interface IProps {
    navigation: NavigationScreenProp<{}>
    post: IPostData,
    setPost: (post: IPostData) => void
}

const ImagesScreen = ({navigation, post, setPost}: IProps) => {
    const loadImages = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            cropping: true,
            width: 1000,
            height: 1000
        }).then(image => {
            setPost({...post, images: [...post.images, image.path]})
            nextStep()
        }).catch(e => {
            console.log(e)
        });
    }

    const loadCamera = () => {
        ImagePicker.openCamera({
            mediaType: 'photo',
            cropping: true,
            width: 1000,
            height: 1000
        }).then(image => {
            setPost({...post, images: [...post.images, image.path]})
            nextStep()
        }).catch(e => {
            console.log(e)
        });
    }

    const deleteImage = (item: string) => {
        setPost({...post, images: post.images.filter(el => el !== item)})
    }


    const nextStep = () => {
        navigation.navigate('NewPostDescription')
    }
    return (
        <>
            {post.images.length === 0 ?
                <AutoHeightImage
                    source={require('../../ui/images/oldImage.jpeg')}
                    width={Dimensions.get('window').width}/>
                :
                <FlatList
                    data={post.images}
                    renderItem={(({item, index}) => <PostImageComponent
                        eraseCallback={() => deleteImage(item)}
                        uri={item}/>)}
                    keyExtractor={(index) => index}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                />}
            <View style={styles.container}>
                <View style={globalStyles.marginLine}>
                    <ButtonComponent title={'Камера'} callBack={loadCamera} icon={<CameraIcon/>}/>
                    <ButtonComponent title={'Галерея'} callBack={loadImages} icon={<GalleryIcon/>}/>
                    <ButtonComponent title={'Далее'} callBack={nextStep} type={'invert'}
                                     disabled={post.images.length === 0}/>
                </View>
            </View>
        </>

    );
};

export default ImagesScreen
