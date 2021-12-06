import React from 'react';
import PlusTabIcon from '../ui/svg/plusTabIcon';
import PersonalTabIcon from '../ui/svg/personalTabIcon';
import InfoTabIcon from '../ui/svg/infoTabIcon';
import HelloScreen from '../screens/helloScreen';
import {useSelector} from 'react-redux';
import LoginStack from './login';
import {RelativeStack} from './relative';
import RelativeTabIcon from '../ui/svg/relativeTabIcon';
import UserStack from './user';
import NotesListStack from "./notes";
import {userSelector} from "../store/selectors";
import NotesListTabIcon from "../ui/svg/notesListTabIcon";
import {NewNoteStack} from "./newNote";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import TreeScreen from "../screens/tree/tree";

const TabsNavigator = () => {

    const selectUser = useSelector(userSelector);
    const userAuth = Object.keys(selectUser).length > 0

    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
            screenOptions={{tabBarShowLabel: false}}
        >
            <Tab.Screen
                name={'treeScreen'}
                component={userAuth ? TreeScreen : HelloScreen}
                options={{
                    tabBarIcon: ({color}) => <InfoTabIcon color={color}/>,
                }}
            />

            <Tab.Screen
                name={'notesListStack'}
                component={userAuth ? NotesListStack : LoginStack}
                options={{
                    tabBarIcon: ({color}) => <NotesListTabIcon color={color}/>,
                    headerShown: false
                }}
            />

            <Tab.Screen
                name={'addNoteStack'}
                component={userAuth ? NewNoteStack : LoginStack}
                options={{
                    tabBarIcon: ({color}) => <PlusTabIcon color={color}/>,
                    headerShown: false
                }}
            />

            <Tab.Screen
                name={'relativeStack'}
                component={userAuth ? RelativeStack : LoginStack}
                options={{
                    tabBarIcon: ({color}) => <RelativeTabIcon color={color}/>,
                    headerShown: false
                }}
            />
            <Tab.Screen
                name={'personalStack'}
                component={userAuth ? UserStack : LoginStack}
                options={{
                    tabBarIcon: ({color}) => <PersonalTabIcon color={color}/>,
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
};
export {TabsNavigator};
