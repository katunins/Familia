import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from "../interfaces/navigation";
import ImagesScreen, {INoteImagesProps} from "../screens/newNotes/imagesScreen";
import DescriptionScreen from "../screens/newNotes/descriptionScreen";
import RelativesScreen from "../screens/newNotes/relativesScreen";
import {useSelector} from "react-redux";
import {relativesSelector} from "../store/selectors";
import {initialNote} from "../config";
import {INoteData} from "../interfaces/store";
import {Image} from "react-native-image-crop-picker";

const NewNoteStack = () => {
    const Stack = createStackNavigator<RootStackParamList>();
    const relatives = useSelector(relativesSelector)
    const [note, setNote] = useState<INoteData>(initialNote)
    const [newImages, setNewImages] = useState<Image[]>([])
    const [deleteImages, setDeleteImages] = useState<string[]>([])
    const imagesProps = {newImages, setNewImages, deleteImages, setDeleteImages}
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'NewNoteImages'}
                options={{title: 'Добавьте фотографии'}}
            >
                {(props) =>
                    <ImagesScreen {...props} note={note} setNote={setNote} imagesProps={imagesProps}/>}
            </Stack.Screen>
            <Stack.Screen
                name={'NewNoteDescription'}
                options={{title: 'Добавьте описание'}}
            >
                {(props) =>
                    <DescriptionScreen {...props} note={note} setNote={setNote} newImages={newImages}/>}
            </Stack.Screen>
            <Stack.Screen
                name={'NewNoteRelatives'}
                options={{title: 'Отметьте родственников'}}
            >
                {(props) =>
                    <RelativesScreen {...props} note={note} setNote={setNote} relatives={relatives} imagesProps={imagesProps}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
export {NewNoteStack};
