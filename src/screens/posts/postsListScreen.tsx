import {View, Text, FlatList} from "react-native";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import userSelector, {postsSelector, relativesSelector} from "../../store/selectors";
import PostComponent from "../../components/post";
import SeparatorComponent from "../../components/separator";
import TrashIcon from "../../ui/svg/trashIcon";
import EditIcon from "../../ui/svg/editIcon";
import SearchLineComponent from "../../components/searchLine";
import styles from "./styles";
import {IPost} from "../../interfaces/store";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../interfaces/navigation";
import {actionDeletePost} from "../../store/slice/posts.slice";
import {resetModal, setModal} from "../../store/slice/modal.slice";
import globalStyles from "../../styles/styles";

// type IProps = NativeStackScreenProps<RootStackParamList, 'PostsListScreen'>
interface IProps {
    navigation: NativeStackScreenProps<RootStackParamList, 'PostsListScreen'>
    searchText:string
}
const PostsListScreen = ({navigation, searchText}: IProps) => {
    const selectPosts = useSelector(postsSelector)
    const selectUser = useSelector(userSelector)
    const selectRelatives = useSelector(relativesSelector)

    const filterList = (item: IPost) => {
        if (searchText.length < 3 || searchText === '') return true
        if (item.title.toUpperCase().indexOf(searchText.toUpperCase()) >= 0) return true
        if (item.description.toUpperCase().indexOf(searchText.toUpperCase()) >= 0) return true
        return false
    }

    const dispatch = useDispatch()

    const editPost = (item: IPost) => {
        // @ts-ignore
        navigation.navigate('PostEditScreen', {post: item})
    }

    const deletePost = (post: IPost) => {
        dispatch(setModal({

            title: 'Внимание!',
            bodyText: 'Вы действительно хотите удалить запись?',
            buttons: [
                {
                    title: 'Удалить',
                    callBack: () => {
                        dispatch(actionDeletePost({
                            post: post,
                            callback: () => {}
                        }))
                    },
                    type: 'invert'
                },
                {
                    title: 'Отменить',
                },
            ]
        }))
    }
    return (
        <FlatList
            data={selectPosts.filter(item => item.creator === selectUser.id && filterList(item))}
            // @ts-ignore
            listKey={(item, index) => `_key${index.toString()}`}
            renderItem={({item, index}) =>
                <PostComponent
                    item={item}
                    selectRelatives={selectRelatives}
                    dotsMenu={[
                        {
                            title: 'Изменить',
                            callBack: () => editPost(item),
                            icon: <EditIcon/>
                        },
                        {
                            title: 'Удалить',
                            callBack: () => deletePost(item),
                            icon: <TrashIcon/>
                        }
                    ]}
                />}
            ItemSeparatorComponent={SeparatorComponent}
            keyExtractor={item => item.id}
        />
    );
};

export default PostsListScreen
