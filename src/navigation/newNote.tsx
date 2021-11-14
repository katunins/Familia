import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {INavigation, RootStackParamList} from "../interfaces/navigation";
import ImagesScreen from "../screens/newNote/imagesScreen";
import DescriptionScreen from "../screens/newNote/descriptionScreen";
import RelativesScreen from "../screens/newNote/relativesScreen";
import {useSelector} from "react-redux";
import {relativesSelector} from "../store/selectors";
import {initialNote} from "../config";
import {INoteData} from "../interfaces/store";
import {Image} from "react-native-image-crop-picker";
import HeaderComponent from "../components/header";

import ArrowBackIcon from "../ui/svg/arrowBack";
import LoaderComponent from "../components/loader";

const Stack = createStackNavigator<RootStackParamList>();

const NewNoteStack = ({navigation}: INavigation) => {
    const relatives = useSelector(relativesSelector)

    const [note, setNote] = useState<INoteData>(initialNote)
    const [newImages, setNewImages] = useState<Image[]>([])
    const [deleteImages, setDeleteImages] = useState<string[]>([])
    const imagesProps = {newImages, setNewImages, deleteImages, setDeleteImages}

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'NewNoteImages'}
                options={{
                    title: 'Добавьте фотогарфии',
                    headerRight: ()=><LoaderComponent/>
                }}
            >
                {(props) =>
                    <ImagesScreen {...props} note={note} setNote={setNote} imagesProps={imagesProps}/>}
            </Stack.Screen>

            <Stack.Screen
                name={'NewNoteDescription'}
                options={{
                    title: 'Добавьте описание',
                    headerRight: ()=><LoaderComponent/>
                }}
            >
                {(props) =>
                    <DescriptionScreen {...props} note={note} setNote={setNote} newImages={newImages}/>}
            </Stack.Screen>

            <Stack.Screen
                name={'NewNoteRelatives'}
                options={{
                    title: 'Отметьте родственников',
                    headerRight: ()=><LoaderComponent/>
                }}
            >
                {(props) =>
                    <RelativesScreen {...props} note={note} setNote={setNote} relatives={relatives}
                                     imagesProps={imagesProps}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
export {NewNoteStack};
