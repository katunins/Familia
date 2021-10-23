import {View, FlatList} from "react-native";
import React from "react";
import ButtonComponent from "../../components/button";
import styles from "./styles";
import globalStyles from "../../styles/styles";
import {useDispatch, useSelector} from "react-redux";
import RelativeCheckListElementComponent from "../../components/relativeCheckListElement";
import SeparatorComponent from "../../components/separator";
import {actionAddPost} from "../../store/slice/posts.slice";
import firestore from "@react-native-firebase/firestore";
import {NavigationScreenProp} from "react-navigation";
import {IPostData, IRelative} from "../../interfaces/store";
import userSelector from "../../store/selectors";
import {initialPostData} from "../../helpers/utils";

interface IProps {
    navigation: NavigationScreenProp<{}>
    post: IPostData,
    setPost: (post: IPostData) => void
    relatives: IRelative[]
}

const RelativesScreen = ({navigation, post, setPost, relatives}: IProps) => {
    const dispatch = useDispatch()
    const selectUser = useSelector(userSelector)
    const save = () => {
        dispatch(actionAddPost({
            post: {
                ...post,
                id: '',
                creator: selectUser.id,
                createdAt: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp()
            },
            callback: () => {
                setPost(initialPostData)
                // @ts-ignore
                navigation.popToTop()
                navigation.navigate('postsListStack', {screen: 'PostsListScreen'})
            }
        }))
    }
    const isChecked = (id: string) => post.relatives.find(item => item === id) ? true : false
    const switchCheck = (id: string) => {
        if (isChecked(id)) {
            setPost({...post, relatives: post.relatives.filter(item=>item !== id)})
        } else {
            setPost({...post, relatives: [...post.relatives, id]})
        }
    }
    const cancel = () => {
        setPost(initialPostData)
        // @ts-ignore
        navigation.popToTop()
    }

    return (
        <View
            style={styles.container}>
            <FlatList
                style={styles.flatListWrapper}
                data={relatives}
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
    );
};

export default RelativesScreen
