import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {INavigation, RootStackParamList} from "../interfaces/navigation";
import NotesListScreen from "../screens/notes/notesListScreen";
import NoteEditScreen from "../screens/notes/noteEditScreen";
import LoaderComponent from "../components/loader";
import NoteDetailScreen from "../screens/notes/noteDetailScreen";

const Stack = createStackNavigator<RootStackParamList>();

const NotesListStack = () => {
    const [searchText, setSearchText] = useState('')
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    title: 'Записи',
                    headerRight: ()=><LoaderComponent/>
                }}
                name="NotesListScreen"
            >
                {(props) => <NotesListScreen {...props} searchText={searchText} setSearchText={setSearchText}/>}
            </Stack.Screen>
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
