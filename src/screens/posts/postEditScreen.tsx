import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../interfaces/navigation";
import {FlatList, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import PostImageComponent from "../../components/postImage";
import {IPost} from "../../interfaces/store";
import ButtonComponent from "../../components/button";
import CameraIcon from "../../ui/svg/cameraIcon";
import GalleryIcon from "../../ui/svg/galeryIcon";
import ImagePicker from "react-native-image-crop-picker";
import styles from "./styles";
import SeparatorComponent from "../../components/separator";
import globalStyles from "../../styles/styles";
import {useDispatch, useSelector} from "react-redux";
import userSelector, {relativesSelector} from "../../store/selectors";
import RelativeCheckListElementComponent from "../../components/relativeCheckListElement";
import {actionAddPost, actionUpdatePost} from "../../store/slice/posts.slice";
import firestore from "@react-native-firebase/firestore";
import {initialPostData} from "../../helpers/utils";
import {actionDeleteImages} from "../../store/slice/firebase.slice";

type IProps = NativeStackScreenProps<RootStackParamList, 'PostEditScreen'>
const PostEditScreen: React.FunctionComponent<IProps> = ({route, navigation}) => {

    const selectRelatives = useSelector(relativesSelector)
    const dispatch = useDispatch()
    const [post, setPost] = useState<IPost>(route.params.post)
    const [deleteImages, setDeleteImages] = useState<string[]>([])

    const deleteImage = (item: string) => {
        setPost({...post, images: post.images.filter(uri => uri !== item)})
        setDeleteImages([...deleteImages, item])
    }
    const loadImages = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            cropping: true,
            width: 1000,
            height: 1000
        }).then(image => {
            setPost({...post, images: [...post.images, image.path]})
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
        }).catch(e => {
            console.log(e)
        });
    }

    const isChecked = (id: string) => post.relatives.find(item => item === id) ? true : false
    const switchCheck = (id: string) => {
        if (isChecked(id)) {
            setPost({...post, relatives: post.relatives.filter(item => item !== id)})
        } else {
            setPost({...post, relatives: [...post.relatives, id]})
        }
    }

    const cancel = () => {
        setPost({...post, ...initialPostData})
        setDeleteImages([])
        navigation.goBack()
    }

    const save = () => {
        dispatch(actionUpdatePost({
            post: {
                ...post,
                updatedAt: firestore.FieldValue.serverTimestamp()
            },
            callback: () => {
                if (deleteImages.length > 0) dispatch(actionDeleteImages(deleteImages))
                setPost({...post, ...initialPostData})
                setDeleteImages([])
                navigation.goBack()
                // @ts-ignore
            }
        }))
    }

    return (
        <View>
            <FlatList
                data={post.images}
                renderItem={(({item, index}) => <PostImageComponent
                    eraseCallback={() => deleteImage(item)}
                    uri={item}/>)}
                keyExtractor={(index) => index}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
                ListFooterComponent={
                    <View style={styles.container}>
                        <Text style={styles.centerTitleText}>Добавьте фотографии</Text>
                        <ButtonComponent title={'Камера'} callBack={loadCamera} icon={<CameraIcon/>}/>
                        <ButtonComponent title={'Галерея'} callBack={loadImages} icon={<GalleryIcon/>}/>
                        <View style={globalStyles.marginLine}/>
                        <SeparatorComponent/>
                        <Text style={styles.centerTitleText}>Измените описание</Text>
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
                        <Text style={styles.centerTitleText}>Отметьте родственников</Text>
                        <FlatList
                            style={styles.flatListWrapper}
                            data={selectRelatives}
                            renderItem={({item}) =>
                                <RelativeCheckListElementComponent
                                    item={item}
                                    checked={isChecked(item.id)}
                                    callBack={() => {
                                        switchCheck(item.id)
                                    }}
                                />}
                            ItemSeparatorComponent={() => <SeparatorComponent/>}
                        />
                        <View style={globalStyles.marginLine}>
                            <ButtonComponent title={'Отменить'} callBack={cancel}/>
                            <ButtonComponent title={'Сохранить'} callBack={save} type={'invert'}/>
                        </View>
                    </View>
                }
            />


        </View>
    )
}
export default PostEditScreen
