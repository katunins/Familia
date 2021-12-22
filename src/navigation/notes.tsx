import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotesListScreen from "../screens/notes/notesListScreen";
import NoteEditScreen from "../screens/notes/noteEditScreen";
import LoaderComponent from "../components/loader";
import NoteDetailScreen from "../screens/notes/noteDetailScreen";
import {RootStackParamList} from "./declare.navigation";

const Stack = createStackNavigator<RootStackParamList>();

const NotesListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    title: 'Записи',
                    headerRight: ()=><LoaderComponent/>
                }}
                name="NotesListScreen"
                component={NotesListScreen}
            />
            <Stack.Screen
                options={{
                    title:'Редактирование записи',
                    headerRight: ()=><LoaderComponent/>
                }}
                name="NoteEditScreen"
                component={NoteEditScreen}
            />
            <Stack.Screen
                options={{
                    title:'Детальная страница',
                }}
                name="NoteDetailScreen"
                component={NoteDetailScreen}
            />
        </Stack.Navigator>
    );
};

export default NotesListStack;
