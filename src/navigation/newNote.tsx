import React, {useCallback, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {initialNote} from "../config";
import LoaderComponent from "../components/loader";
import AddNoteStepOneScreen from "../screens/notes/addNoteStepOne";
import {IServerNote} from "../interfaces/store";
import {Image} from "react-native-image-crop-picker";
import AddNoteStepSecondScreen from "../screens/notes/addNoteStepSecond";
import {useFocusEffect} from "@react-navigation/native";
import {RootStackParamList} from "./declare.navigation";

const Stack = createStackNavigator<RootStackParamList>();

const NewNoteStack = () => {

    const [note, setNote] = useState<IServerNote>(initialNote)
    const [newImages, setNewImages] = useState<Image[]>([])
    const reset = () => {
        setNote({...initialNote})
        setNewImages([])
    }
    const stepProps = {note, setNote, newImages, setNewImages, reset}

    useFocusEffect(
        useCallback(() => {
            return reset;
        }, [])
    );

    return (
        <Stack.Navigator>
            <Stack.Screen name={'AddNoteStepOne'} options={{
                title: 'Новая запись',
                headerRight: () => <LoaderComponent/>
            }}>
                {(props) => <AddNoteStepOneScreen {...stepProps} {...props}/>}
            </Stack.Screen>
            <Stack.Screen name={'AddNoteStepSecond'} options={{
                title: 'Новая запись',
                headerRight: () => <LoaderComponent/>
            }}>
                {(props) => <AddNoteStepSecondScreen {...stepProps} {...props}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
export {NewNoteStack};
