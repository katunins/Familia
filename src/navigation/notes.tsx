import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from "../interfaces/navigation";
import SearchLineComponent from '../components/searchLine';
import NotesListScreen from "../screens/notes/notesListScreen";
import NoteEditScreen from "../screens/notes/noteEditScreen";

const Stack = createStackNavigator<RootStackParamList>();

const NotesListStack = () => {

    const [searchText, setSearchText] = useState('')
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    // title: 'Ваши записи',
                    headerTitle: (props) => <SearchLineComponent setSearchText={setSearchText} searchText={searchText}/>
                }}
                name="NotesListScreen"
                // component={NotesListScreen}
            >
                {(props) => <NotesListScreen {...props} searchText={searchText}/>}
            </Stack.Screen>
            <Stack.Screen
                options={{
                    title: 'Редактирование записи',
                }}
                name="NoteEditScreen"
                component={NoteEditScreen}
            />
        </Stack.Navigator>
    );
};

export default NotesListStack;
