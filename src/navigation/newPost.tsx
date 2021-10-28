import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from "../interfaces/navigation";
import ImagesScreen from "../screens/newPosts/imagesScreen";
import DescriptionScreen from "../screens/newPosts/descriptionScreen";
import RelativesScreen from "../screens/newPosts/relativesScreen";
import {IPostData} from "../interfaces/store";
import {useSelector} from "react-redux";
import {relativesSelector} from "../store/selectors";
import {initialPost} from "../config";

const NewPostsStack = () => {
    const Stack = createStackNavigator<RootStackParamList>();
    const relatives = useSelector(relativesSelector)


    const [post, setPost] = useState<IPostData>(initialPost)

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'NewPostImages'}
                options={{title: 'Добавьте фотографии'}}
            >
                {(props) =>
                    <ImagesScreen {...props} post={post} setPost={setPost}/>}
            </Stack.Screen>
            <Stack.Screen
                name={'NewPostDescription'}
                options={{title: 'Добавьте описание'}}
            >
                {(props) =>
                    <DescriptionScreen {...props} post={post} setPost={setPost}/>}
            </Stack.Screen>
            <Stack.Screen
                name={'NewPostRelatives'}
                options={{title: 'Отметьте родственников'}}
            >
                {(props) =>
                    <RelativesScreen {...props} post={post} setPost={setPost} relatives={relatives}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
export {NewPostsStack};
