import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from '../styles/styles';
import PlusTabIcon from '../ui/svg/plusTabIcon';
import PersonalTabIcon from '../ui/svg/personalTabIcon';
import InfoTabIcon from '../ui/svg/infoTabIcon';
import HelloScreen from '../screens/helloScreen';
import {useSelector} from 'react-redux';
import LoginStack from './login';
import { RelativeStack} from './relative';
import RelativeTabIcon from '../ui/svg/relativeTabIcon';
import UserStack from './user';
import PostsListTabIcon from "../ui/svg/postListTabIcon";
import {NewPostsStack} from "./newPost";
import PostsListStack from "./posts";
import {postsSelector, userSelector} from "../store/selectors";

const TabsNavigator = () => {
    const selectUser = useSelector(userSelector);
    const posts = useSelector(postsSelector)

    // Ключ скрытия Tab Навигатора
    const Tab = createMaterialBottomTabNavigator();
    const userAuth = Object.keys(selectUser).length > 0

    return (
        <Tab.Navigator
            activeColor={EStyleSheet.value('$textColorGlobal')}
            inactiveColor={EStyleSheet.value('$colorLightGrey')}
            barStyle={styles.barStyle}
            initialRouteName={posts.length === 0 ? 'personalStack':'postsListStack'}
            shifting={false}
        >
            <Tab.Screen
                name={'helloScreen'}
                component={HelloScreen}
                options={{
                    tabBarIcon: ({color}) => <InfoTabIcon color={color}/>,
                    title: '',
                }}
            />

            <Tab.Screen
                name={'postsListStack'}
                component={userAuth ? PostsListStack : LoginStack}
                options={{
                    tabBarIcon: ({color}) => <PostsListTabIcon color={color} />,
                    title: '',
                }}
            />

            <Tab.Screen
            name={'addPostStack'}
            component={userAuth ? NewPostsStack : LoginStack}
            options={{
            tabBarIcon: ({color}) => <PlusTabIcon color={color} />,
            title: '',
        }}
            />

            <Tab.Screen
            name={'relativeStack'}
            component={userAuth ? RelativeStack : LoginStack}
            options={{
            tabBarIcon: ({color}) => <RelativeTabIcon color={color} />,
            title: '',
        }}
            />
            <Tab.Screen
            name={'personalStack'}
            component={
            userAuth ? UserStack : LoginStack
        }
            options={{
            tabBarIcon: ({color}) => <PersonalTabIcon color={color} />,
            title: '',
        }}
            />
            </Tab.Navigator>
            );
        };
            export {TabsNavigator};
